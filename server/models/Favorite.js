import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.Mixed, required: true },
    equipment_id: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  {
    collection: 'favorites',
    timestamps: {
      createdAt: 'created_at'
    },
    versionKey: false
  }
);

favoriteSchema.index({ user_id: 1, equipment_id: 1 }, { unique: true });

const Favorite = mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema);
export default Favorite;
