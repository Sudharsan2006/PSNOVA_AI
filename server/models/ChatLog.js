const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     ChatMessage:
 *       type: object
 *       properties:
 *         role:
 *           type: string
 *           enum: [user, assistant]
 *         content:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */
const ChatLogSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true },
    messages: [
      {
        role: { type: String, enum: ['user', 'assistant'], required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    userAgent: { type: String, default: '' },
    ipAddress: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ChatLog', ChatLogSchema);
