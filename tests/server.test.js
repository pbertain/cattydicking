const request = require('supertest');
const app = require('../server');

describe('Cattydicking Server', () => {
  // Use supertest directly with the app - no need to start a server
  // supertest handles the server lifecycle automatically

  describe('GET /', () => {
    it('should serve the main page', async () => {
      const response = await request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /text\/html/);
      
      expect(response.text).toContain('CATtYDICKING');
      expect(response.text).toContain('The Legend Lives On');
    }, 10000); // 10 second timeout
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)
        .expect('Content-Type', /application\/json/);
      
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('service', 'cattydicking');
      expect(response.body).toHaveProperty('timestamp');
    }, 10000);
  });

  describe('Static files', () => {
    it('should serve CSS files', async () => {
      await request(app)
        .get('/css/main.css')
        .expect(200)
        .expect('Content-Type', /text\/css/);
    }, 10000);

    it('should serve image files', async () => {
      await request(app)
        .get('/images/cattydicking.gif')
        .expect(200);
    }, 10000);

    it('should serve the other image file', async () => {
      await request(app)
        .get('/images/jeremiah-jimbo.png')
        .expect(200);
    }, 10000);
  });

  describe('Security headers', () => {
    it('should include security headers', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.headers).toHaveProperty('x-content-type-options');
      expect(response.headers).toHaveProperty('x-frame-options');
    }, 10000);
  });

  describe('404 handling', () => {
    it('should serve index.html for unknown routes', async () => {
      const response = await request(app)
        .get('/nonexistent-route')
        .expect(200)
        .expect('Content-Type', /text\/html/);
      
      expect(response.text).toContain('CATtYDICKING');
    }, 10000);
  });
});
