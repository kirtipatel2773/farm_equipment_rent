import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    booking_id: { type: mongoose.Schema.Types.Mixed },
    equipment_id: { type: mongoose.Schema.Types.Mixed, required: true },
    user_id: { type: mongoose.Schema.Types.Mixed, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: '' }
  },
  {
    collection: 'reviews',
    timestamps: {
      createdAt: 'created_at'
    },
    versionKey: false
  }
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
export default Review;
