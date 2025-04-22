import User from '../models/User.js';

// Admin: list all users
export async function getAllUsers(req, res) {
  const users = await User.find().select('-password');
  res.json(users);
}

// User: get own profile
export async function getProfile(req, res) {
  res.json(req.user);
}

// Admin: create user
export async function createUser(req, res) {
  const { name, email, password, role } = req.body;
  if (await User.findOne({ email }))
    return res.status(400).json({ error: 'Email in use' });

  const user = await User.create({ name, email, password, role });
  res.status(201).json({ id: user._id, name, email, role });
}

// Admin: update user
export async function updateUser(req, res) {
  const { name, email, role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    { new: true }
  ).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}

// Admin: delete user
export async function deleteUser(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}
