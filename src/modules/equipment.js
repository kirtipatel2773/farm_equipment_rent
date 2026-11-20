import mongoose from 'mongoose';

const ownerSnapshotSchema = new mongoose.Schema(
  {
    name: String,
    role: { type: String, default: 'Farm Equipment Owner' },
    avatar: String,
    phone: String,
    rating: { type: Number, default: 5 },
    verified: { type: Boolean, default: true },
    location: String,
    memberSince: String
  },
  { _id: false }
);

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    brand: { type: String, default: '' },
    model: { type: String, default: '' },
    pricePerDay: { type: Number, required: true, min: 1 },
    securityDeposit: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 5 },
    reviews: { type: Number, default: 0 },
    location: { type: String, default: '' },
    distance: { type: String, default: '' },
    image: { type: String, default: '' },
    gallery: [String],
    description: { type: String, default: '' },
    features: [String],
    horsepower: { type: String, default: '' },
    year: { type: String, default: '' },
    condition: { type: String, default: 'Good' },
    fuelType: { type: String, default: 'Diesel' },
    available: { type: Boolean, default: true },
    owner: ownerSnapshotSchema,
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }
  },
  { timestamps: true }
);

equipmentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    ret.ownerId = ret.ownerId ? ret.ownerId.toString() : undefined;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema, 'equipments');
