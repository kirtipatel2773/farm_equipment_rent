import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.Mixed },
    full_name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    password_hash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['farmer', 'owner', 'admin'],
      default: 'farmer'
    },
    preferred_language: {
      type: String,
      default: 'en'
    },
    location: {
      type: String,
      default: 'Indore, MP'
    },
    avatar_url: {
      type: String,
      default: 'https://thumbs.dreamstime.com/b/vector-icon-user-avatar-web-site-mobile-app-man-face-flat-style-social-network-profile-45836554.jpg'
    }
  },
  {
    collection: 'users',
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    versionKey: false
  }
);

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id ? ret._id.toString() : '';
    delete ret.password_hash;
    return ret;
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
