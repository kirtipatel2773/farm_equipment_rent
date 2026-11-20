import Equipment from '../../models/Equipment.js';
import EquipmentCategory from '../../models/EquipmentCategory.js';
import User from '../../models/User.js';
import EquipmentImage from '../../models/EquipmentImage.js';

export const getEquipment = async (req, res, next) => {
  try {
    const { 
      search, 
      category, 
      location, 
      minPrice, 
      maxPrice, 
      minRating, 
      available, 
      sort,
      limit = 50,
      page = 1
    } = req.query;

    const filter = {
      availability_status: { $ne: 'inactive' }
    };

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name: regex },
        { brand: regex },
        { model: regex },
        { description: regex }
      ];
    }

    if (location && location !== 'All Locations' && location !== 'All') {
      filter.location = new RegExp(location.trim(), 'i');
    }

    if (available === 'true' || available === true) {
      filter.availability_status = 'available';
    }

    if (minPrice || maxPrice) {
      filter.price_per_day = {};
      if (minPrice) filter.price_per_day.$gte = Number(minPrice);
      if (maxPrice) filter.price_per_day.$lte = Number(maxPrice);
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    // Resolve category filter if specified
    if (category && category !== 'All' && category !== 'All Categories') {
      const catDoc = await EquipmentCategory.findOne({
        $or: [
          { name: new RegExp(`^${category.trim()}$`, 'i') },
          { slug: category.trim().toLowerCase() }
        ]
      });

      if (catDoc) {
        filter.$and = filter.$and || [];
        filter.$and.push({
          $or: [
            { category_id: catDoc._id },
            { category_id: Number(catDoc._id) || 0 },
            { category_id: catDoc.slug }
          ]
        });
      }
    }

    // Sorting
    let sortObj = { _id: 1 };
    if (sort === 'price_asc' || sort === 'price-low') {
      sortObj = { price_per_day: 1 };
    } else if (sort === 'price_desc' || sort === 'price-high') {
      sortObj = { price_per_day: -1 };
    } else if (sort === 'rating') {
      sortObj = { rating: -1 };
    } else if (sort === 'newest') {
      sortObj = { _id: -1 };
    }

    const items = await Equipment.find(filter)
      .sort(sortObj)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Equipment.countDocuments(filter);

    // Fetch categories and owners for enrichment
    const categories = await EquipmentCategory.find();
    const categoryMap = {};
    categories.forEach(c => {
      categoryMap[String(c._id)] = c;
      categoryMap[c.slug] = c;
    });

    const ownerIds = [...new Set(items.map(i => i.owner_id))];
    const owners = await User.find({ _id: { $in: ownerIds } });
    const ownerMap = {};
    owners.forEach(o => {
      ownerMap[String(o._id)] = o;
    });

    const data = items.map(item => {
      const itemObj = item.toJSON();
      const cat = categoryMap[String(item.category_id)] || { name: 'Agricultural Implement', slug: 'other' };
      const owner = ownerMap[String(item.owner_id)] || {
        full_name: 'Verified Farm Owner',
        phone: '+91 98260 11234',
        avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        location: item.location
      };

      return {
        ...itemObj,
        id: String(item._id),
        name: item.name,
        category: cat.name,
        categoryId: cat._id,
        categorySlug: cat.slug,
        brand: item.brand,
        model: item.model || 'Standard',
        description: item.description,
        pricePerDay: Number(item.price_per_day),
        securityDeposit: Number(item.security_deposit),
        location: item.location,
        state: item.state,
        horsepower: item.horsepower || '50 HP',
        year: String(item.manufacturing_year || 2023),
        condition: item.condition,
        fuelType: item.fuel_type,
        available: item.availability_status === 'available',
        availabilityStatus: item.availability_status,
        image: item.image_url,
        rating: Number(item.rating || 5.0),
        reviews: Number(item.reviews_count || 0),
        owner: {
          id: owner._id ? String(owner._id) : '1',
          name: owner.full_name,
          phone: owner.phone,
          avatar: owner.avatar_url,
          location: owner.location || item.location,
          role: 'Equipment Owner',
          rating: 4.9,
          verified: true
        }
      };
    });

    res.json({
      success: true,
      total,
      count: data.length,
      data
    });
  } catch (err) {
    next(err);
  }
};

export const getEquipmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = { $or: [{ _id: id }, { _id: Number(id) || 0 }] };
    const item = await Equipment.findOne(query);

    if (!item || item.availability_status === 'inactive') {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found in catalog.'
      });
    }

    const catQuery = { $or: [{ _id: item.category_id }, { _id: Number(item.category_id) || 0 }] };
    const category = await EquipmentCategory.findOne(catQuery);

    const ownerQuery = { $or: [{ _id: item.owner_id }, { _id: Number(item.owner_id) || 0 }] };
    const owner = await User.findOne(ownerQuery);

    const images = await EquipmentImage.find({
      $or: [{ equipment_id: item._id }, { equipment_id: Number(item._id) || 0 }]
    }).sort({ sort_order: 1 });

    const gallery = [item.image_url, ...images.map(img => img.image_url)].filter(Boolean);
    const uniqueGallery = [...new Set(gallery)];

    const itemObj = item.toJSON();

    const result = {
      ...itemObj,
      id: String(item._id),
      name: item.name,
      category: category ? category.name : 'Tractor',
      categoryId: category ? category._id : 1,
      categorySlug: category ? category.slug : 'tractor',
      brand: item.brand,
      model: item.model || 'Standard Edition',
      description: item.description,
      pricePerDay: Number(item.price_per_day),
      securityDeposit: Number(item.security_deposit),
      location: item.location,
      state: item.state,
      horsepower: item.horsepower || '50 HP',
      year: String(item.manufacturing_year || 2023),
      condition: item.condition,
      fuelType: item.fuel_type,
      available: item.availability_status === 'available',
      availabilityStatus: item.availability_status,
      image: item.image_url,
      gallery: uniqueGallery.length > 0 ? uniqueGallery : [item.image_url],
      rating: Number(item.rating || 5.0),
      reviews: Number(item.reviews_count || 0),
      owner: {
        id: owner ? String(owner._id) : String(item.owner_id),
        name: owner ? owner.full_name : 'Verified Owner',
        phone: owner ? owner.phone : '+91 98260 11234',
        avatar: owner ? owner.avatar_url : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        location: owner ? owner.location : item.location,
        role: 'Equipment Owner',
        rating: 4.9,
        verified: true,
        memberSince: 'Member'
      }
    };

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const createEquipment = async (req, res, next) => {
  try {
    const {
      name,
      category,
      categoryId,
      brand,
      model,
      description,
      pricePerDay,
      securityDeposit,
      location,
      state,
      horsepower,
      year,
      condition,
      fuelType,
      image
    } = req.body;

    if (!name || !pricePerDay) {
      return res.status(400).json({
        success: false,
        message: 'Name and price per day are required.'
      });
    }

    // Determine category_id
    let catId = categoryId;
    if (!catId && category) {
      const catDoc = await EquipmentCategory.findOne({
        $or: [
          { name: new RegExp(`^${category.trim()}$`, 'i') },
          { slug: category.trim().toLowerCase() }
        ]
      });
      if (catDoc) catId = catDoc._id;
    }
    if (!catId) catId = 1;

    const price = Number(pricePerDay);
    const deposit = Number(securityDeposit) || Math.round(price * 2);
    const ownerId = req.user ? req.user.id : 1;
    const defaultImg = image || 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80';

    // Auto-assign sequential integer ID to match schema
    const maxEq = await Equipment.findOne({ _id: { $type: 'number' } }).sort({ _id: -1 }).select('_id');
    const nextId = (maxEq && typeof maxEq._id === 'number' ? maxEq._id : 0) + 1;

    const newEquipment = new Equipment({
      _id: nextId,
      owner_id: ownerId,
      category_id: catId,
      name: name.trim(),
      brand: brand ? brand.trim() : 'Standard',
      model: model ? model.trim() : name.trim(),
      description: description ? description.trim() : 'Agricultural equipment listed for rental on AgriRent.',
      price_per_day: price,
      security_deposit: deposit,
      location: location || (req.user?.location) || 'Indore, MP',
      state: state || 'Madhya Pradesh',
      horsepower: horsepower || '50 HP',
      manufacturing_year: year ? Number(year) : 2023,
      condition: condition || 'Excellent',
      fuel_type: fuelType || 'Diesel',
      availability_status: 'available',
      image_url: defaultImg,
      rating: 5.0,
      reviews_count: 0
    });

    await newEquipment.save();

    // Optionally save equipment image
    const newImage = new EquipmentImage({
      equipment_id: nextId,
      image_url: defaultImg,
      alt_text: name,
      sort_order: 1
    });
    await newImage.save();

    const savedObj = newEquipment.toJSON();

    res.status(201).json({
      success: true,
      message: 'Equipment listed successfully and saved to MongoDB.',
      data: {
        ...savedObj,
        id: String(nextId),
        name: newEquipment.name,
        category: category || 'Tractor',
        brand: newEquipment.brand,
        model: newEquipment.model,
        pricePerDay: price,
        image: defaultImg,
        available: true
      }
    });
  } catch (err) {
    next(err);
  }
};

export const updateEquipment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = { $or: [{ _id: id }, { _id: Number(id) || 0 }] };
    const existing = await Equipment.findOne(query);

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Equipment not found.' });
    }

    const ownerId = req.user.id;
    if (String(existing.owner_id) !== String(ownerId) && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized. You can only edit your own equipment.' });
    }

    const {
      name,
      brand,
      model,
      description,
      pricePerDay,
      securityDeposit,
      location,
      condition,
      availabilityStatus
    } = req.body;

    if (name) existing.name = name.trim();
    if (brand) existing.brand = brand.trim();
    if (model) existing.model = model.trim();
    if (description) existing.description = description.trim();
    if (pricePerDay) existing.price_per_day = Number(pricePerDay);
    if (securityDeposit) existing.security_deposit = Number(securityDeposit);
    if (location) existing.location = location.trim();
    if (condition) existing.condition = condition;
    if (availabilityStatus) existing.availability_status = availabilityStatus;

    await existing.save();

    res.json({
      success: true,
      message: 'Equipment updated successfully.',
      data: existing.toJSON()
    });
  } catch (err) {
    next(err);
  }
};

export const toggleAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = { $or: [{ _id: id }, { _id: Number(id) || 0 }] };
    const existing = await Equipment.findOne(query);

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Equipment not found.' });
    }

    existing.availability_status = existing.availability_status === 'available' ? 'rented' : 'available';
    await existing.save();

    res.json({
      success: true,
      message: `Equipment marked as ${existing.availability_status}.`,
      data: existing.toJSON()
    });
  } catch (err) {
    next(err);
  }
};

export const deleteEquipment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = { $or: [{ _id: id }, { _id: Number(id) || 0 }] };
    const existing = await Equipment.findOne(query);

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Equipment not found.' });
    }

    const ownerId = req.user.id;
    if (String(existing.owner_id) !== String(ownerId) && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized. You can only delete your own equipment.' });
    }

    existing.availability_status = 'inactive';
    await existing.save();

    res.json({
      success: true,
      message: 'Equipment deactivated and removed from catalog.'
    });
  } catch (err) {
    next(err);
  }
};

export const getOwnerFleet = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const items = await Equipment.find({
      $or: [{ owner_id: ownerId }, { owner_id: Number(ownerId) || 0 }],
      availability_status: { $ne: 'inactive' }
    }).sort({ _id: -1 });

    const categories = await EquipmentCategory.find();
    const categoryMap = {};
    categories.forEach(c => {
      categoryMap[String(c._id)] = c.name;
    });

    const formatted = items.map(item => {
      const itemObj = item.toJSON();
      return {
        ...itemObj,
        id: String(item._id),
        name: item.name,
        category: categoryMap[String(item.category_id)] || 'Tractor',
        brand: item.brand,
        model: item.model,
        pricePerDay: Number(item.price_per_day),
        location: item.location,
        condition: item.condition,
        available: item.availability_status === 'available',
        availabilityStatus: item.availability_status,
        image: item.image_url,
        rating: Number(item.rating),
        reviews: item.reviews_count
      };
    });

    res.json({
      success: true,
      data: formatted
    });
  } catch (err) {
    next(err);
  }
};
