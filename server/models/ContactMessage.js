import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, default: '' },
    message: { type: String, required: true },
    status: { type: String, default: 'new' }
  },
  {
    collection: 'contact_messages',
    timestamps: {
      createdAt: 'created_at'
    },
    versionKey: false
  }
);

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;
