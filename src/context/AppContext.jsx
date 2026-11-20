import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Dynamic data from MongoDB
  const [equipmentList, setEquipmentList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [ownerRequests, setOwnerRequests] = useState([]);
  const [ownerFleet, setOwnerFleet] = useState([]);
  const [location, setLocation] = useState('Indore, MP');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch equipment list from MongoDB
  const fetchEquipment = useCallback(async (params = {}) => {
    try {
      const res = await api.equipment.getAll(params);
      if (res.success && Array.isArray(res.data)) {
        setEquipmentList(res.data);
      }
    } catch (err) {
      console.error('Failed to load equipment from database:', err.message);
      setError(err.message);
      setEquipmentList([]);
    }
  }, []);

  // Fetch categories from MongoDB
  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.categories.getAll();
      if (res.success && Array.isArray(res.data)) {
        setCategories(res.data);
      }
    } catch (err) {
      console.error('Failed to load categories from database:', err.message);
      setCategories([]);
    }
  }, []);

  // Fetch user session, bookings and favorites from MongoDB
  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem('agrirent_token');
    if (!token) {
      setUser(null);
      setFavorites([]);
      setBookings([]);
      setOwnerRequests([]);
      setOwnerFleet([]);
      return;
    }

    try {
      const meRes = await api.auth.getMe();
      if (meRes.success && meRes.user) {
        setUser(meRes.user);

        // Fetch favorites
        try {
          const favRes = await api.favorites.getAll();
          if (favRes.success && Array.isArray(favRes.data)) {
            setFavorites(favRes.data);
          }
        } catch (favErr) {
          console.warn('Favorites fetch notice:', favErr.message);
        }

        // Fetch user-specific bookings from MongoDB
        if (meRes.user.role === 'owner') {
          try {
            const reqRes = await api.bookings.getOwnerBookings();
            if (reqRes.success && Array.isArray(reqRes.data)) {
              setOwnerRequests(reqRes.data);
            }
          } catch (reqErr) {
            console.warn('Owner requests fetch notice:', reqErr.message);
          }

          try {
            const fleetRes = await api.equipment.getOwnerFleet();
            if (fleetRes.success && Array.isArray(fleetRes.data)) {
              setOwnerFleet(fleetRes.data);
            }
          } catch (fleetErr) {
            console.warn('Owner fleet fetch notice:', fleetErr.message);
          }
        } else {
          try {
            const bRes = await api.bookings.getMyBookings();
            if (bRes.success && Array.isArray(bRes.data)) {
              setBookings(bRes.data);
            }
          } catch (bErr) {
            console.warn('Bookings fetch notice:', bErr.message);
          }
        }
      }
    } catch (err) {
      console.warn('Session expired or server offline:', err.message);
      localStorage.removeItem('agrirent_token');
      localStorage.removeItem('agrirent_user');
      setUser(null);
    }
  }, []);

  // Initial load
  useEffect(() => {
    const initApp = async () => {
      setLoading(true);
      await Promise.allSettled([
        fetchEquipment(),
        fetchCategories(),
        fetchUserData()
      ]);
      setLoading(false);
    };

    initApp();
  }, [fetchEquipment, fetchCategories, fetchUserData]);

  // Actions
  const toggleFavorite = async (equipmentId) => {
    if (!user) {
      throw new Error('Please login to save equipment to your favorites.');
    }

    try {
      const res = await api.favorites.toggle(equipmentId);
      if (res.isFavorite) {
        setFavorites(prev => [...prev, String(equipmentId)]);
      } else {
        setFavorites(prev => prev.filter(id => id !== String(equipmentId)));
      }
      return res;
    } catch (err) {
      console.error('Error toggling favorite:', err.message);
      throw err;
    }
  };

  const isFavorite = (equipmentId) => {
    return favorites.includes(String(equipmentId));
  };

  const addEquipment = async (newItemData) => {
    try {
      const res = await api.equipment.create(newItemData);
      if (res.success && res.data) {
        setEquipmentList(prev => [res.data, ...prev]);
        setOwnerFleet(prev => [res.data, ...prev]);
        return res.data;
      }
      throw new Error(res.message || 'Failed to list equipment in database.');
    } catch (err) {
      console.error('Error creating equipment:', err.message);
      throw err;
    }
  };

  const toggleEquipmentAvailability = async (id) => {
    try {
      const res = await api.equipment.toggleAvailability(id);
      if (res.success) {
        setEquipmentList(prev => prev.map(item =>
          item.id === String(id) ? { ...item, available: !item.available } : item
        ));
        setOwnerFleet(prev => prev.map(item =>
          item.id === String(id) ? { ...item, available: !item.available } : item
        ));
      }
      return res;
    } catch (err) {
      console.error('Error toggling availability:', err.message);
      throw err;
    }
  };

  const deleteEquipment = async (id) => {
    try {
      const res = await api.equipment.delete(id);
      if (res.success) {
        setEquipmentList(prev => prev.filter(item => item.id !== String(id)));
        setOwnerFleet(prev => prev.filter(item => item.id !== String(id)));
      }
      return res;
    } catch (err) {
      console.error('Error deleting equipment:', err.message);
      throw err;
    }
  };

  const createBooking = async (bookingData) => {
    try {
      const res = await api.bookings.create(bookingData);
      if (res.success && res.data) {
        setBookings(prev => [res.data, ...prev]);
        return res.data;
      }
      throw new Error(res.message || 'Failed to save booking in database.');
    } catch (err) {
      console.error('Error creating booking:', err.message);
      throw err;
    }
  };

  const updateRequestStatus = async (requestId, status) => {
    try {
      const res = await api.bookings.updateStatus(requestId, status);
      if (res.success) {
        setOwnerRequests(prev => prev.map(req =>
          req.id === String(requestId) ? { ...req, status: status.charAt(0).toUpperCase() + status.slice(1) } : req
        ));
      }
      return res;
    } catch (err) {
      console.error('Error updating request status:', err.message);
      throw err;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const res = await api.auth.login(email, password);
      if (res.success && res.token && res.user) {
        localStorage.setItem('agrirent_token', res.token);
        localStorage.setItem('agrirent_user', JSON.stringify(res.user));
        setUser(res.user);
        await fetchUserData();
        return res.user;
      }
      throw new Error(res.message || 'Login failed.');
    } catch (err) {
      console.error('Login error:', err.message);
      throw err;
    }
  };

  const signupUser = async (userData) => {
    try {
      const res = await api.auth.register(userData);
      if (res.success && res.token && res.user) {
        localStorage.setItem('agrirent_token', res.token);
        localStorage.setItem('agrirent_user', JSON.stringify(res.user));
        setUser(res.user);
        await fetchUserData();
        return res.user;
      }
      throw new Error(res.message || 'Registration failed.');
    } catch (err) {
      console.error('Signup error:', err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('agrirent_token');
    localStorage.removeItem('agrirent_user');
    setUser(null);
    setBookings([]);
    setFavorites([]);
    setOwnerRequests([]);
    setOwnerFleet([]);
  };

  // Re-fetch helpers
  const refreshEquipment = fetchEquipment;
  const refreshCategories = fetchCategories;
  const refreshUserData = fetchUserData;

  return (
    <AppContext.Provider value={{
      equipmentList,
      categories,
      user,
      favorites,
      bookings,
      ownerRequests,
      ownerFleet,
      location,
      setLocation,
      loading,
      error,
      toggleFavorite,
      isFavorite,
      addEquipment,
      toggleEquipmentAvailability,
      deleteEquipment,
      createBooking,
      updateRequestStatus,
      login: loginUser,
      signup: signupUser,
      logout,
      refreshEquipment,
      refreshCategories,
      refreshUserData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
