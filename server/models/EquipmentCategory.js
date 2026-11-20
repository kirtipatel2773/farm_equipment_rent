import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.Mixed },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    image_url: { type: String, default: '' }
  },
  {
    collection: 'equipment_categories',
    versionKey: false
  }
);

categorySchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id ? ret._id.toString() : ret.slug;
    return ret;
  }
});

const EquipmentCategory = mongoose.models.EquipmentCategory || mongoose.model('EquipmentCategory', categorySchema);
export default EquipmentCategory;
