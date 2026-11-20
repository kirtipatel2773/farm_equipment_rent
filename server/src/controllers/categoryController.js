import EquipmentCategory from '../../models/EquipmentCategory.js';
import Equipment from '../../models/Equipment.js';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await EquipmentCategory.find().sort({ _id: 1 });

    // Calculate equipment counts dynamically from equipment collection
    const equipmentCounts = await Equipment.aggregate([
      { $match: { availability_status: { $ne: 'inactive' } } },
      { $group: { _id: '$category_id', count: { $sum: 1 } } }
    ]);

    const countMap = {};
    equipmentCounts.forEach(c => {
      countMap[String(c._id)] = c.count;
    });

    const result = categories.map(cat => {
      const catObj = cat.toJSON();
      const count = countMap[String(cat._id)] || countMap[cat.slug] || 0;
      return {
        ...catObj,
        id: catObj.id || cat.slug,
        equipment_count: count,
        equipmentCount: count
      };
    });

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};
