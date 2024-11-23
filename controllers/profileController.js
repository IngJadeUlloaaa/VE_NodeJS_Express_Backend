// controllers/profileController.js
import { getProfileByUserCode } from '../models/profileModel.js';

export const getProfile = (req, res) => {
  const userCode = req.user?.code; // Verifica que 'req.user' existe y contiene 'code'

  if (!userCode) {
    return res.status(400).json({ message: 'User code is required' });
  }

  getProfileByUserCode(userCode, (err, profile) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: 'Error retrieving profile.' });
    }
    if (!profile || profile.length === 0) {
      return res.status(404).json({ message: 'No profile found for this user.' });
    }

    res.status(200).json(profile);
  });
};