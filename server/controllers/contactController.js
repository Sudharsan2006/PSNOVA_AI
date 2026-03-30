const Contact = require('../models/Contact');

/**
 * @desc    Submit a contact message
 * @route   POST /api/contact
 * @access  Public
 */
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic required field check
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required.',
      });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || 'General Enquiry',
      message: message.trim(),
      ipAddress:
        req.headers['x-forwarded-for']?.split(',')[0] ||
        req.socket.remoteAddress ||
        'unknown',
    });

    return res.status(201).json({
      success: true,
      message: 'Message received! We will get back to you soon. 🚀',
      data: {
        id: contact._id,
        name: contact.name,
        createdAt: contact.createdAt,
      },
    });
  } catch (err) {
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    console.error('Contact submit error:', err);
    return res.status(500).json({ success: false, error: 'Server error. Please try again.' });
  }
};

/**
 * @desc    Get all contact messages (admin only — protect in prod)
 * @route   GET /api/contact
 * @access  Admin
 */
const getContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [contacts, total] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit).select('-ipAddress'),
      Contact.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: contacts,
    });
  } catch (err) {
    console.error('Get contacts error:', err);
    return res.status(500).json({ success: false, error: 'Server error.' });
  }
};

/**
 * @desc    Mark a contact message as read
 * @route   PATCH /api/contact/:id/read
 * @access  Admin
 */
const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ success: false, error: 'Message not found.' });
    return res.status(200).json({ success: true, data: contact });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Server error.' });
  }
};

module.exports = { submitContact, getContacts, markAsRead };
