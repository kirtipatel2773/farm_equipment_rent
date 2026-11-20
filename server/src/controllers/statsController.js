import Booking from '../../models/Booking.js';
import Equipment from '../../models/Equipment.js';
import User from '../../models/User.js';
import Favorite from '../../models/Favorite.js';

export const getOwnerStats = async (req, res, next) => {
  try {
    const ownerId = req.user ? req.user.id : 1;

    // Get all equipment owned by this owner
    const ownerEquipments = await Equipment.find({
      $or: [{ owner_id: ownerId }, { owner_id: Number(ownerId) || 0 }],
      availability_status: { $ne: 'inactive' }
    });

    const eqIds = ownerEquipments.map(e => e._id);

    const bookings = await Booking.find({
      $or: [
        { equipment_id: { $in: eqIds } },
        { equipment_id: { $in: eqIds.map(Number).filter(n => !isNaN(n)) } }
      ]
    });

    const pendingRequests = bookings.filter(b => 
      b.booking_status && b.booking_status.toLowerCase() === 'pending'
    ).length;

    const confirmedBookings = bookings.filter(b => 
      b.booking_status && ['confirmed', 'completed', 'accepted'].includes(b.booking_status.toLowerCase())
    );

    // Dynamic earnings calculated strictly from database confirmed bookings
    const totalEarnings = confirmedBookings.reduce((sum, b) => sum + (Number(b.total_amount) || 0), 0);

    res.json({
      success: true,
      data: {
        fleetCount: ownerEquipments.length,
        totalBookings: bookings.length,
        pendingRequests,
        confirmedCount: confirmedBookings.length,
        totalEarnings,
        activeListings: ownerEquipments.filter(e => e.availability_status === 'available').length
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getFarmerStats = async (req, res, next) => {
  try {
    const farmerId = req.user ? req.user.id : 2;

    const bookings = await Booking.find({
      $or: [{ farmer_id: farmerId }, { farmer_id: Number(farmerId) || 0 }]
    });

    const activeBookings = bookings.filter(b => 
      b.booking_status && ['pending', 'confirmed', 'accepted'].includes(b.booking_status.toLowerCase())
    ).length;

    const completedBookings = bookings.filter(b => 
      b.booking_status && b.booking_status.toLowerCase() === 'completed'
    ).length;

    const favoritesCount = await Favorite.countDocuments({
      $or: [{ user_id: farmerId }, { user_id: Number(farmerId) || 0 }]
    });

    const totalSpent = bookings
      .filter(b => b.booking_status && ['confirmed', 'completed', 'accepted'].includes(b.booking_status.toLowerCase()))
      .reduce((sum, b) => sum + (Number(b.total_amount) || 0), 0);

    res.json({
      success: true,
      data: {
        totalBookings: bookings.length,
        activeBookings,
        completedBookings,
        favoritesCount,
        totalSpent
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getPlatformStats = async (req, res, next) => {
  try {
    const totalEquipment = await Equipment.countDocuments({ availability_status: { $ne: 'inactive' } });
    const totalFarmers = await User.countDocuments({ role: 'farmer' });
    const totalOwners = await User.countDocuments({ role: 'owner' });
    const totalBookings = await Booking.countDocuments();

    const locations = await Equipment.distinct('location', { availability_status: { $ne: 'inactive' } });

    res.json({
      success: true,
      data: {
        totalEquipment,
        totalFarmers,
        totalOwners,
        totalBookings,
        locationsServed: locations.length
      }
    });
  } catch (err) {
    next(err);
  }
};
