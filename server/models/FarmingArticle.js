import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.Mixed },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: 'General' },
    summary: { type: String, default: '' },
    content: { type: String, required: true },
    language: { type: String, default: 'en' },
    published: { type: Number, default: 1 }
  },
  {
    collection: 'farming_articles',
    versionKey: false
  }
);

articleSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id ? ret._id.toString() : ret.slug;
    return ret;
  }
});

const FarmingArticle = mongoose.models.FarmingArticle || mongoose.model('FarmingArticle', articleSchema);
export default FarmingArticle;
