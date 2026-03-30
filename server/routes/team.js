const express = require('express');
const router = express.Router();

// Static team data — also returned by API so frontend can fetch it
const TEAM = [
  {
    id: 1,
    name: 'Sudharsan R V',
    role: 'Data Analyst',
    bio: 'Premium data analyst who transforms complex datasets into compelling visual stories. Passionate about business intelligence and predictive analytics.',
    skills: ['Python', 'Power BI', 'SQL', 'Tableau', 'Machine Learning', 'Excel'],
    photo: '/images/sudharsan.jpg',
    portfolioUrl: 'https://sudharsanrv.vercel.app',
    linkedin: 'https://www.linkedin.com/in/sudharsan-r-v/',
    email: 'sudharsanrv2003@gmail.com',
    accent: '#6c63ff',
    number: '01',
  },
  {
    id: 2,
    name: 'Praveen Kumar B',
    role: 'Data Analyst',
    bio: 'Data-driven analyst who thrives on uncovering hidden patterns. Skilled in end-to-end analytics pipelines from data collection to impactful dashboards.',
    skills: ['Python', 'SQL', 'Excel', 'Power BI', 'Statistics', 'Data Visualization'],
    photo: '/images/praveenkumar.jpeg',
    portfolioUrl: 'https://praveennkumar.vercel.app',
    linkedin: 'https://www.linkedin.com/in/praveennkumar/',
    email: '',
    accent: '#00d4aa',
    number: '02',
  },
  {
    id: 3,
    name: 'Nissanth S P',
    role: 'AI/ML Engineer',
    bio: 'Enthusiastic AI/ML student building intelligent systems for real-world problems — from gesture recognition to agri-tech platforms.',
    skills: ['Python', 'Machine Learning', 'NLP', 'Mediapipe', 'IoT', 'UiPath', 'Cloud/GenAI'],
    photo: '/images/nissanth.jpeg',
    portfolioUrl: 'https://nissanth.vercel.app',
    linkedin: 'https://www.linkedin.com/in/nissanth-s-p-041b94289/',
    email: 'nissanth2k6@gmail.com',
    accent: '#ff6b9d',
    number: '03',
  },
  {
    id: 4,
    name: 'Narendra A',
    role: 'AI/ML & VR Engineer',
    bio: 'Building intelligent medical simulations and AR/VR systems in collaboration with IIT Madras. Specializes in computer vision and speech recognition.',
    skills: ['Unity / VR', 'Computer Vision', 'OpenAI Whisper', 'Python', 'DICOM', 'AprilTag'],
    photo: '/images/naren.jpeg',
    portfolioUrl: 'https://narendra-portfolio-six.vercel.app',
    linkedin: 'https://www.linkedin.com/in/narendra-anbazhagan',
    email: 'narendra.a2116@gmail.com',
    accent: '#f59e0b',
    number: '04',
  },
];

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Get all team members
 *     tags: [Team]
 *     responses:
 *       200:
 *         description: Array of team member objects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 */
router.get('/', (req, res) => {
  res.status(200).json({ success: true, count: TEAM.length, data: TEAM });
});

/**
 * @swagger
 * /api/team/{id}:
 *   get:
 *     summary: Get a single team member by ID
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Team member object
 *       404:
 *         description: Member not found
 */
router.get('/:id', (req, res) => {
  const member = TEAM.find((m) => m.id === parseInt(req.params.id));
  if (!member) return res.status(404).json({ success: false, error: 'Member not found.' });
  res.status(200).json({ success: true, data: member });
});

module.exports = router;
