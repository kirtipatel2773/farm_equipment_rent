import Booking from '../../models/Booking.js';
import Equipment from '../../models/Equipment.js';
import EquipmentCategory from '../../models/EquipmentCategory.js';
import User from '../../models/User.js';
import Notification from '../../models/Notification.js';

export const createBooking = async (req, res, next) => {
  try {
    const {
      equipmentId,
      startDate,
      endDate,
      deliveryOption = 'delivery',
      deliveryAddress,
      farmerName,
      farmerPhone,
      notes,
      paymentMethod
    } = req.body;

    const farmerId = req.user ? req.user.id : 2;

    if (!equipmentId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Equipment ID, start date, and return date are required.'
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid date format provided.'
      });
    }

    if (end < start) {
      return res.status(400).json({
        success: false,
        message: 'Return date cannot precede commencement date.'
      });
    }

    // Verify equipment exists
    const eqQuery = { $or: [{ _id: equipmentId }, { _id: Number(equipmentId) || 0 }] };
    const equipment = await Equipment.findOne(eqQuery);

    if (!equipment || equipment.availability_status === 'inactive') {
      return res.status(404).json({
        success: false,
        message: 'Selected farm equipment is no longer available or does not exist.'
      });
    }

    // Check date overlap with existing confirmed bookings
    const overlapping = await Booking.findOne({
      equipment_id: equipment._id,
      booking_status: { $in: ['confirmed', 'Confirmed', 'accepted', 'Accepted'] },
      $or: [
        { start_date: { $lte: endDate }, end_date: { $gte: startDate } }
      ]
    });

    if (overlapping) {
      return res.status(409).json({
        success: false,
        message: `This equipment is already reserved from ${overlapping.start_date} to ${overlapping.end_date}. Please choose different operational dates.`
      });
    }

    // Calculations
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const rentalDays = diffDays > 0 ? diffDays : 1;

    const pricePerDay = Number(equipment.price_per_day);
    const subtotal = rentalDays * pricePerDay;
    const deliveryFee = deliveryOption === 'delivery' ? 450 : 0;
    const platformFee = Math.round(subtotal * 0.05);
    const securityDeposit = Number(equipment.security_deposit) || Math.round(pricePerDay * 2);
    const totalAmount = subtotal + deliveryFee + platformFee;

    // Generate booking reference & integer ID
    const maxBooking = await Booking.findOne({ _id: { $type: 'number' } }).sort({ _id: -1 }).select('_id');
    const nextId = (maxBooking && typeof maxBooking._id === 'number' ? maxBooking._id : 0) + 1;
    const bookingReference = `BK-${new Date().getFullYear()}-${100 + nextId}`;

    const newBooking = new Booking({
      _id: nextId,
      booking_reference: bookingReference,
      farmer_id: farmerId,
      equipment_id: equipment._id,
      start_date: startDate,
      end_date: endDate,
      rental_days: rentalDays,
      price_per_day_snapshot: pricePerDay,
      subtotal,
      delivery_fee: deliveryFee,
      platform_fee: platformFee,
      security_deposit: securityDeposit,
      total_amount: totalAmount,
      booking_status: 'confirmed',
      payment_status: 'paid',
      delivery_option: deliveryOption,
      delivery_address: deliveryAddress || req.user?.location || 'Indore, MP',
      farmer_name: farmerName || req.user?.full_name || 'Farmer',
      farmer_phone: farmerPhone || req.user?.phone || '+91 98765 43210',
      notes: notes || ''
    });

    await newBooking.save();

    // Create notifications for owner and farmer
    try {
      const ownerNotif = new Notification({
        user_id: equipment.owner_id,
        title: 'New Rental Request Received',
        message: `${newBooking.farmer_name} requested ${equipment.name} from ${startDate} to ${endDate}. Total ₹${totalAmount}.`,
        is_read: 0
      });
      await ownerNotif.save();

      const farmerNotif = new Notification({
        user_id: farmerId,
        title: 'Booking Confirmed',
        message: `Your booking ${bookingReference} for ${equipment.name} is confirmed. Total ₹${totalAmount}.`,
        is_read: 0
      });
      await farmerNotif.save();
    } catch (notifErr) {
      console.warn('Notification creation notice:', notifErr.message);
    }

    const bookingObj = newBooking.toJSON();

    res.status(201).json({
      success: true,
      message: 'Booking confirmed and saved to database.',
      bookingReference,
      data: {
        ...bookingObj,
        id: String(nextId),
        bookingReference,
        equipmentId: String(equipment._id),
        equipmentName: equipment.name,
        equipmentImage: equipment.image_url,
        startDate,
        endDate,
        days: rentalDays,
        pricePerDay,
        subtotal,
        deliveryFee,
        platformFee,
        securityDeposit,
        totalAmount,
        status: 'Confirmed'
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const farmerId = req.user ? req.user.id : 2;

    const bookings = await Booking.find({
      $or: [{ farmer_id: farmerId }, { farmer_id: Number(farmerId) || 0 }]
    }).sort({ _id: -1 });

    const eqIds = bookings.map(b => b.equipment_id);
    const equipments = await Equipment.find({
      $or: [{ _id: { $in: eqIds } }, { _id: { $in: eqIds.map(Number).filter(n => !isNaN(n)) } }]
    });
    const eqMap = {};
    equipments.forEach(e => {
      eqMap[String(e._id)] = e;
    });

    const categories = await EquipmentCategory.find();
    const catMap = {};
    categories.forEach(c => {
      catMap[String(c._id)] = c.name;
    });

    const ownerIds = equipments.map(e => e.owner_id);
    const owners = await User.find({ _id: { $in: ownerIds } });
    const ownerMap = {};
    owners.forEach(o => {
      ownerMap[String(o._id)] = o;
    });

    const formatted = bookings.map(b => {
      const eq = eqMap[String(b.equipment_id)] || { name: 'Farm Equipment', image_url: '', brand: '', category_id: 1, owner_id: 1 };
      const catName = catMap[String(eq.category_id)] || 'Tractor';
      const owner = ownerMap[String(eq.owner_id)] || { full_name: 'Verified Owner', phone: '+91 98260 11234' };
      const statusStr = b.booking_status ? (b.booking_status.charAt(0).toUpperCase() + b.booking_status.slice(1).toLowerCase()) : 'Confirmed';

      return {
        id: String(b._id),
        bookingReference: b.booking_reference,
        equipmentId: String(b.equipment_id),
        equipmentName: eq.name,
        equipmentBrand: eq.brand,
        equipmentCategory: catName,
        equipmentImage: eq.image_url,
        ownerName: owner.full_name,
        ownerPhone: owner.phone,
        startDate: b.start_date,
        endDate: b.end_date,
        days: b.rental_days,
        pricePerDay: Number(b.price_per_day_snapshot),
        subtotal: Number(b.subtotal),
        deliveryFee: Number(b.delivery_fee),
        platformFee: Number(b.platform_fee),
        securityDeposit: Number(b.security_deposit),
        totalAmount: Number(b.total_amount),
        status: statusStr,
        paymentStatus: b.payment_status,
        deliveryOption: b.delivery_option,
        deliveryAddress: b.delivery_address,
        createdAt: b.created_at || b.start_date
      };
    });

    res.json({
      success: true,
      count: formatted.length,
      data: formatted
    });
  } catch (err) {
    next(err);
  }
};

export const getOwnerBookings = async (req, res, next) => {
  try {
    const ownerId = req.user ? req.user.id : 1;

    // Find all equipment belonging to this owner
    const ownerEquipments = await Equipment.find({
      $or: [{ owner_id: ownerId }, { owner_id: Number(ownerId) || 0 }]
    });

    const eqIds = ownerEquipments.map(e => e._id);
    const eqMap = {};
    ownerEquipments.forEach(e => {
      eqMap[String(e._id)] = e;
    });

    const categories = await EquipmentCategory.find();
    const catMap = {};
    categories.forEach(c => {
      catMap[String(c._id)] = c.name;
    });

    const bookings = await Booking.find({
      $or: [
        { equipment_id: { $in: eqIds } },
        { equipment_id: { $in: eqIds.map(Number).filter(n => !isNaN(n)) } }
      ]
    }).sort({ _id: -1 });

    const formatted = bookings.map(b => {
      const eq = eqMap[String(b.equipment_id)] || { name: 'Farm Equipment', image_url: '', category_id: 1 };
      const catName = catMap[String(eq.category_id)] || 'Tractor';
      const statusStr = b.booking_status ? (b.booking_status.charAt(0).toUpperCase() + b.booking_status.slice(1).toLowerCase()) : 'Pending';

      return {
        id: String(b._id),
        bookingReference: b.booking_reference,
        farmerName: b.farmer_name || 'Farmer',
        farmerPhone: b.farmer_phone || '+91 98765 43210',
        farmerLocation: b.delivery_address || 'Indore, MP',
        equipmentId: String(b.equipment_id),
        equipmentName: eq.name,
        equipmentCategory: catName,
        equipmentImage: eq.image_url,
        startDate: b.start_date,
        endDate: b.end_date,
        days: b.rental_days,
        amount: Number(b.total_amount),
        status: statusStr,
        dateRequested: b.created_at || b.start_date,
        notes: b.notes
      };
    });

    res.json({
      success: true,
      count: formatted.length,
      data: formatted
    });
  } catch (err) {
    next(err);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const ownerId = req.user ? req.user.id : 1;

    const validStatuses = ['pending', 'confirmed', 'in_field', 'completed', 'cancelled', 'rejected', 'accepted'];
    const cleanStatus = status ? status.toLowerCase() : '';

    if (!validStatuses.includes(cleanStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status '${status}'. Must be one of: ${validStatuses.join(', ')}.`
      });
    }

    const query = { $or: [{ _id: id }, { _id: Number(id) || 0 }] };
    const booking = await Booking.findOne(query);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking request not found.'
      });
    }

    // Verify ownership of the equipment
    const eq = await Equipment.findOne({ $or: [{ _id: booking.equipment_id }, { _id: Number(booking.equipment_id) || 0 }] });
    if (eq && String(eq.owner_id) !== String(ownerId) && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized. You can only update bookings for your own machinery.'
      });
    }

    booking.booking_status = cleanStatus === 'accepted' ? 'confirmed' : cleanStatus;
    await booking.save();

    // Notify farmer of status change
    try {
      const notif = new Notification({
        user_id: booking.farmer_id,
        title: `Rental Request ${cleanStatus.toUpperCase()}`,
        message: `Your booking ${booking.booking_reference} for ${eq ? eq.name : 'Machinery'} has been marked as ${cleanStatus}.`
      });
      await notif.save();
    } catch (e) {
      // Continue
    }

    res.json({
      success: true,
      message: `Booking status updated to '${booking.booking_status}'.`,
      data: booking.toJSON()
    });
  } catch (err) {
    next(err);
  }
};
