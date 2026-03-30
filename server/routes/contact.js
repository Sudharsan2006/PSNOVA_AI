const express = require('express');
const router = express.Router();
const { submitContact, getContacts, markAsRead } = require('../controllers/contactController');
const rateLimit = require('express-rate-limit');

// Stricter limiter for contact form (5 per 15 min)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, error: 'Too many messages. Please wait 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Submit a contact message
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, message]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Smith
 *               email:
 *                 type: string
 *                 example: jane@example.com
 *               subject:
 *                 type: string
 *                 example: Collaboration Opportunity
 *               message:
 *                 type: string
 *                 example: Hi team! I'd love to work with you on a project.
 *     responses:
 *       201:
 *         description: Message submitted successfully
 *       400:
 *         description: Validation error
 *       429:
 *         description: Too many requests
 */
router.post('/', contactLimiter, submitContact);

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get all contact messages (Admin)
 *     tags: [Contact]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of all messages
 */
router.get('/', getContacts);

/**
 * @swagger
 * /api/contact/{id}/read:
 *   patch:
 *     summary: Mark a message as read
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Marked as read
 *       404:
 *         description: Message not found
 */
router.patch('/:id/read', markAsRead);

module.exports = router;
