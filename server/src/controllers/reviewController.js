import Review from '../../models/Review.js';
import Equipment from '../../models/Equipment.js';
import User from '../../models/User.js';

export const getEquipmentReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = { $or: [{ equipment_id: id }, { equipment_id: Number(id) || 0 }] };
    const reviews = await Review.find(query).sort({ _id: -1 });

    const userIds = reviews.map(r => r.user_id);
    const users = await User.find({ _id: { $in: userIds } });
    const userMap = {};
    users.forEach(u => {
      userMap[String(u._id)] = u;
    });

    const formatted = reviews.map(r => {
      const u = userMap[String(r.user_id)] || { full_name: 'Verified Farmer', avatar_url: '', location: 'Indore, MP' };
      return {
        id: String(r._id),
        rating: r.rating,
        comment: r.comment,
        createdAt: r.created_at,
        farmerName: u.full_name,
        farmerAvatar: u.avatar_url,
        farmerLocation: u.location
      };
    });

    res.json({
      success: true,
      count: formatted.length,
      data: formatted
    });
  } catch (err) {
    next(err);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment, bookingId } = req.body;
    const farmerId = req.user.id;

    if (!rating || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be an integer between 1 and 5.'
      });
    }

    const newRev = new Review({
      booking_id: bookingId,
      equipment_id: id,
      user_id: farmerId,
      rating: Math.round(Number(rating)),
      comment: comment || ''
    });

    await newRev.save();

    // Recalculate average rating for equipment
    const allReviews = await Review.find({ $or: [{ equipment_id: id }, { equipment_id: Number(id) || 0 }] });
    if (allReviews.length > 0) {
      const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      await Equipment.updateOne(
        { $or: [{ _id: id }, { _id: Number(id) || 0 }] },
        { $set: { rating: parseFloat(avg.toFixed(2)), reviews_count: allReviews.length } }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Review posted and saved to MongoDB.',
      data: newRev.toJSON()
    });
  } catch (err) {
    next(err);
  }
};
