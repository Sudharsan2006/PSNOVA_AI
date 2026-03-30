const Contact = require('../models/Contact');
const Visitor = require('../models/Visitor');
const ChatLog = require('../models/ChatLog');

/**
 * @desc   Get site statistics
 * @route  GET /api/stats
 * @access Public
 */
const getStats = async (req, res) => {
  try {
    // Track today's visit
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    await Visitor.findOneAndUpdate(
      { date: today },
      { $inc: { count: 1 } },
      { upsert: true }
    );

    const [totalVisitors, totalMessages, totalChats] = await Promise.all([
      Visitor.aggregate([{ $group: { _id: null, total: { $sum: '$count' } } }]),
      Contact.countDocuments(),
      ChatLog.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalVisitors: totalVisitors[0]?.total || 0,
        totalMessages,
        totalChats,
        todayVisitors: (await Visitor.findOne({ date: today }))?.count || 1,
      },
    });
  } catch (err) {
    console.error('Stats error:', err);
    return res.status(500).json({ success: false, error: 'Server error.' });
  }
};

module.exports = { getStats };
