import mongoose from 'mongoose';

const equipmentImageSchema = new mongoose.Schema(
  {
    equipment_id: { type: mongoose.Schema.Types.Mixed, required: true },
    image_url: { type: String, required: true },
    alt_text: { type: String, default: '' },
    sort_order: { type: Number, default: 1 }
  },
  {
    collection: 'equipment_images',
    versionKey: false
  }
);

const EquipmentImage = mongoose.models.EquipmentImage || mongoose.model('EquipmentImage', equipmentImageSchema);
export default EquipmentImage;
