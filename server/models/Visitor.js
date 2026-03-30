const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Visitor:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *           example: "2026-03-29"
 *         count:
 *           type: integer
 *           example: 42
 */
const VisitorSchema = new mongoose.Schema(
  {
    // store as YYYY-MM-DD string for easy daily grouping
    date: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Visitor', VisitorSchema);
