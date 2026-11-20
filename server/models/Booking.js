import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.Mixed },
    booking_reference: { type: String, required: true, unique: true },
    farmer_id: { type: mongoose.Schema.Types.Mixed, required: true },
    equipment_id: { type: mongoose.Schema.Types.Mixed, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    rental_days: { type: Number, default: 1 },
    price_per_day_snapshot: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    delivery_fee: { type: Number, default: 0 },
    platform_fee: { type: Number, default: 0 },
    security_deposit: { type: Number, default: 0 },
    total_amount: { type: Number, required: true },
    booking_status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'Pending', 'Confirmed', 'Completed', 'Cancelled', 'Accepted'],
      default: 'pending'
    },
    payment_status: {
      type: String,
      enum: ['pending', 'paid', 'refunded', 'Paid', 'Pending'],
      default: 'paid'
    },
    delivery_option: {
      type: String,
      enum: ['pickup', 'delivery', 'Pickup', 'Delivery'],
      default: 'delivery'
    },
    delivery_address: { type: String, default: '' },
    farmer_name: { type: String, default: '' },
    farmer_phone: { type: String, default: '' },
    notes: { type: String, default: '' }
  },
  {
    collection: 'bookings',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    versionKey: false
  }
);

bookingSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id ? ret._id.toString() : '';
    // Format status with capitalized display if needed
    ret.status = ret.booking_status ? (ret.booking_status.charAt(0).toUpperCase() + ret.booking_status.slice(1).toLowerCase()) : 'Pending';
    ret.amount = ret.total_amount;
    ret.startDate = ret.start_date;
    ret.endDate = ret.end_date;
    ret.days = ret.rental_days;
    ret.farmerLocation = ret.delivery_address;
    ret.farmerName = ret.farmer_name;
    ret.farmerPhone = ret.farmer_phone;
    return ret;
  }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
export default Booking;
