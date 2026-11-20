import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'agrirent_super_secure_jwt_token_key_2026_xyz';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const register = async (req, res, next) => {
  try {
    const { full_name, email, phone, password, role, preferred_language, location } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and password are required fields.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address is already registered.'
      });
    }

    // Hash password with bcrypt - NEVER store plaintext
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const assignedRole = role === 'owner' ? 'owner' : 'farmer';
    const defaultAvatar = assignedRole === 'owner'
      ? 'https://thumbs.dreamstime.com/b/vector-icon-user-avatar-web-site-mobile-app-man-face-flat-style-social-network-profile-45836554.jpg'
      : 'https://thumbs.dreamstime.com/b/vector-icon-user-avatar-web-site-mobile-app-man-face-flat-style-social-network-profile-45836554.jpg';

    // Calculate next sequential integer ID to keep schema identical
    const maxUser = await User.findOne({ _id: { $type: 'number' } }).sort({ _id: -1 }).select('_id');
    const nextId = (maxUser && typeof maxUser._id === 'number' ? maxUser._id : 0) + 1;

    const newUser = new User({
      _id: nextId,
      full_name: full_name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '',
      password_hash,
      role: assignedRole,
      preferred_language: preferred_language || 'en',
      location: location || 'Indore, MP',
      avatar_url: defaultAvatar
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role, email: newUser.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const userObj = newUser.toJSON();

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        ...userObj,
        name: userObj.full_name,
        avatar: userObj.avatar_url
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this email address.'
      });
    }

    // Support both bcrypt hashes and existing plain text passwords for existing records
    let isMatch = false;
    if (user.password_hash === password) {
      isMatch = true;
    } else {
      isMatch = await bcrypt.compare(password, user.password_hash).catch(() => false);
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password entered.'
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const userObj = user.toJSON();

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        ...userObj,
        name: userObj.full_name,
        avatar: userObj.avatar_url
      }
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const query = { $or: [{ _id: req.user.id }, { _id: Number(req.user.id) || 0 }] };
    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const userObj = user.toJSON();
    res.json({
      success: true,
      user: {
        ...userObj,
        name: userObj.full_name,
        avatar: userObj.avatar_url
      }
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { full_name, phone, location, preferred_language, avatar_url } = req.body;
    const query = { $or: [{ _id: req.user.id }, { _id: Number(req.user.id) || 0 }] };

    const updateFields = {};
    if (full_name) updateFields.full_name = full_name.trim();
    if (phone !== undefined) updateFields.phone = phone.trim();
    if (location !== undefined) updateFields.location = location.trim();
    if (preferred_language) updateFields.preferred_language = preferred_language;
    if (avatar_url) updateFields.avatar_url = avatar_url;

    const updated = await User.findOneAndUpdate(query, { $set: updateFields }, { new: true });
    const userObj = updated.toJSON();

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        ...userObj,
        name: userObj.full_name,
        avatar: userObj.avatar_url
      }
    });
  } catch (err) {
    next(err);
  }
};
