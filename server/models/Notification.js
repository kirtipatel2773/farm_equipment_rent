import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.Mixed, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    is_read: { type: Number, default: 0 }
  },
  {
    collection: 'notifications',
    timestamps: {
      createdAt: 'created_at'
    },
    versionKey: false
  }
);

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
export default Notification;
