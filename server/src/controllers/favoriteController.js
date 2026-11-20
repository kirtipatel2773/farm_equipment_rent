import Favorite from '../../models/Favorite.js';

export const getFavorites = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const items = await Favorite.find({
      $or: [{ user_id: userId }, { user_id: Number(userId) || 0 }]
    });

    const ids = items.map(r => String(r.equipment_id));

    res.json({
      success: true,
      data: ids
    });
  } catch (err) {
    next(err);
  }
};

export const toggleFavorite = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const query = {
      $and: [
        { $or: [{ user_id: userId }, { user_id: Number(userId) || 0 }] },
        { $or: [{ equipment_id: id }, { equipment_id: Number(id) || 0 }] }
      ]
    };

    const existing = await Favorite.findOne(query);

    if (existing) {
      await Favorite.deleteOne({ _id: existing._id });
      return res.json({
        success: true,
        message: 'Removed from saved favorites.',
        isFavorite: false,
        equipmentId: id
      });
    } else {
      const newFav = new Favorite({
        user_id: userId,
        equipment_id: id
      });
      await newFav.save();
      return res.json({
        success: true,
        message: 'Saved to favorites in MongoDB.',
        isFavorite: true,
        equipmentId: id
      });
    }
  } catch (err) {
    next(err);
  }
};
