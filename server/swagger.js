const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Team AI Portfolio API',
      version: '1.0.0',
      description: `
## Team AI — KSRCT Portfolio Backend API

Built with Node.js, Express, and MongoDB Atlas.

### Available Features
- 📊 **Team Data** — Fetch all member profiles
- 📩 **Contact Form** — Save messages to MongoDB
- 🤖 **AI Chat** — OpenAI-powered team assistant (with fallback)
- 📈 **Stats** — Visitor analytics

**Base URL (dev):** http://localhost:5000
      `,
      contact: {
        name: 'Team AI — KSRCT',
        email: 'nissanth2k6@gmail.com',
      },
      license: {
        name: 'MIT',
      },
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Development server' },
      { url: 'https://team-ai-api.onrender.com', description: 'Production server (Render)' },
    ],
    tags: [
      { name: 'Team', description: 'Team member data endpoints' },
      { name: 'Contact', description: 'Contact form endpoints' },
      { name: 'AI Chat', description: 'AI assistant endpoints' },
      { name: 'Stats', description: 'Site analytics endpoints' },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

const specs = swaggerJsdoc(options);

/**
 * @param {import('express').Application} app
 */
const setupSwagger = (app) => {
  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
      customSiteTitle: 'Team AI API Docs',
      swaggerOptions: {
        persistAuthorization: true,
        displayRequestDuration: true,
        filter: true,
      },
    })
  );

  // Raw JSON spec endpoint
  app.get('/api/docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  console.log('📄 API Docs: http://localhost:5000/api/docs');
};

module.exports = setupSwagger;
