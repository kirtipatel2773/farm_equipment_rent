import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    icon: { type: String, default: '' }
  },
  { timestamps: true }
);

categorySchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret.slug;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export default mongoose.models.Category || mongoose.model('Category', categorySchema, 'categories');
