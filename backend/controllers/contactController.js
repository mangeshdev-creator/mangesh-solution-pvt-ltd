import ContactMessage from '../models/ContactMessage.js';

export const createMessage = async (req, res) => {
  const { name, email, phone, courseInterested, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'Name, email and message are required' });
  const saved = await ContactMessage.create({ name, email, phone, courseInterested, message });
  res.status(201).json({ message: 'Message sent successfully', data: saved });
};

export const getMessages = async (_req, res) => res.json(await ContactMessage.find().sort({ createdAt: -1 }));
