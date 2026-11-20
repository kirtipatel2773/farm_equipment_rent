import mongoose from 'mongoose';

const equipmentSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.Mixed },
    owner_id: { type: mongoose.Schema.Types.Mixed, required: true },
    category_id: { type: mongoose.Schema.Types.Mixed, required: true },
    name: { type: String, required: true, trim: true },
    brand: { type: String, default: '' },
    model: { type: String, default: '' },
    description: { type: String, default: '' },
    price_per_day: { type: Number, required: true },
    security_deposit: { type: Number, default: 0 },
    location: { type: String, default: 'Indore, MP' },
    state: { type: String, default: 'Madhya Pradesh' },
    horsepower: { type: String, default: '' },
    manufacturing_year: { type: Number, default: 2023 },
    condition: { type: String, default: 'Good' },
    fuel_type: { type: String, default: 'Diesel' },
    availability_status: { type: String, default: 'available' },
    image_url: { type: String, default: '' },
    rating: { type: Number, default: 5.0 },
    reviews_count: { type: Number, default: 0 }
  },
  {
    collection: 'equipment',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    versionKey: false
  }
);

equipmentSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id ? ret._id.toString() : '';
    // Provide camelCase aliases for frontend compatibility
    ret.pricePerDay = ret.price_per_day;
    ret.securityDeposit = ret.security_deposit;
    ret.fuelType = ret.fuel_type;
    ret.year = ret.manufacturing_year ? ret.manufacturing_year.toString() : '';
    ret.available = ret.availability_status === 'available';
    ret.image = ret.image_url;
    ret.reviews = ret.reviews_count;
    return ret;
  }
});

const Equipment = mongoose.models.Equipment || mongoose.model('Equipment', equipmentSchema);
export default Equipment;
