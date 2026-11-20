import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true, index: true }
  },
  { timestamps: true }
);

favoriteSchema.index({ userId: 1, equipmentId: 1 }, { unique: true });

favoriteSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    ret.userId = ret.userId?.toString();
    ret.equipmentId = ret.equipmentId?.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema, 'favorites');
