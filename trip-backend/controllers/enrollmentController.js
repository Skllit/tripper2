import Enrollment from '../models/Enrollment.js';

export const getAllEnrollments = async (req, res) => {
  try {
    const list = await Enrollment
      .find()
      .populate('user','name email')
      .populate('trip','title');
    res.json(list);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Cannot fetch enrollments' });
  }
};

export const updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const enr = await Enrollment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!enr) return res.status(404).json({ error: 'Not found' });
    res.json(enr);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Cannot update status' });
  }
};
