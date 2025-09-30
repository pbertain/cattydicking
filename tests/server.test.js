const request = require('supertest');
const app = require('../server');

describe('Cattydicking Server', () => {
  let server;

  beforeAll((done) => {
    // Start server on a random port for testing
    server = app.listen(0, () => {
      done();
    });
  });

  afterAll((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  describe('GET /', () => {
    it('should serve the main page', async () => {
      const response = await request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /text\/html/);
      
      expect(response.text).toContain('CATtYDICKING');
      expect(response.text).toContain('The Legend Lives On');
    });
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
    });
  });

  describe('Static files', () => {
    it('should serve CSS files', async () => {
      await request(app)
        .get('/css/main.css')
        .expect(200)
        .expect('Content-Type', /text\/css/);
    });

    it('should serve image files', async () => {
      await request(app)
        .get('/images/cattydicking.gif')
        .expect(200);
    });

    it('should serve the other image file', async () => {
      await request(app)
        .get('/images/jeremiah-jimbo.png')
        .expect(200);
    });
  });

  describe('Security headers', () => {
    it('should include security headers', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.headers).toHaveProperty('x-content-type-options');
      expect(response.headers).toHaveProperty('x-frame-options');
    });
  });

  describe('404 handling', () => {
    it('should serve index.html for unknown routes', async () => {
      const response = await request(app)
        .get('/nonexistent-route')
        .expect(200)
        .expect('Content-Type', /text\/html/);
      
      expect(response.text).toContain('CATtYDICKING');
    });
  });
});
