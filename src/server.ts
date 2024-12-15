import { AlbumController, ArtistController, SearchController, SongController } from '#modules/index';
import { PlaylistController } from '#modules/playlists/controllers';
import { App } from './app';
import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { serve } from '@hono/node-server';

const app = new App([
  new SearchController(),
  new SongController(),
  new AlbumController(),
  new ArtistController(),
  new PlaylistController(),
]).getApp();

const api = new OpenAPIHono();
api.route('/', app);
api.doc('/docs', {
  openapi: '3.1.0',
  info: {
    title: 'JioSaavn API',
    version: '0.0.5',
    description: 'Unofficial JioSaavn API',
  },
});
api.get('/ui', swaggerUI({ url: '/docs' }));

// Local Server Execution
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  serve(api, (info) => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export API handler for Vercel
export default api;
