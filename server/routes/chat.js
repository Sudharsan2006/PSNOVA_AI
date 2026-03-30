const express = require('express');
const router = express.Router();
const { chatWithAI } = require('../controllers/chatController');
const rateLimit = require('express-rate-limit');

const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15,
  message: { success: false, error: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Chat with Team AI assistant
 *     tags: [AI Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Tell me about Narendra's projects"
 *               sessionId:
 *                 type: string
 *                 example: "session-abc123"
 *               history:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                     content:
 *                       type: string
 *     responses:
 *       200:
 *         description: AI response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 reply:
 *                   type: string
 *                 source:
 *                   type: string
 *                   enum: [openai, fallback]
 */
router.post('/', chatLimiter, chatWithAI);

module.exports = router;
