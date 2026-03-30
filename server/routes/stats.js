const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getStats } = require('../controllers/statsController');

const statsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get portfolio site statistics
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Site stats
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalVisitors:
 *                       type: integer
 *                     totalMessages:
 *                       type: integer
 *                     totalChats:
 *                       type: integer
 *                     todayVisitors:
 *                       type: integer
 */
router.get('/', statsLimiter, getStats);

module.exports = router;
