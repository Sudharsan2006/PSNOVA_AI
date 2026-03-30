const mongoose = require('mongoose');
const validator = require('validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required: [name, email, message]
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john@example.com
 *         message:
 *           type: string
 *           example: I'd love to collaborate!
 *         read:
 *           type: boolean
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 */
const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Please provide a valid email address',
      },
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [120, 'Subject cannot exceed 120 characters'],
      default: 'General Enquiry',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
      default: 'unknown',
    },
  },
  {
    timestamps: true, // auto adds createdAt + updatedAt
  }
);

module.exports = mongoose.model('Contact', ContactSchema);
