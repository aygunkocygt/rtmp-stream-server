const express = require('express');
const NodeMediaServer = require('node-media-server');

// Set up Express app
const app = express();

// Set up NodeMediaServer configuration
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000, // NodeMediaServer HTTP (for FLV streaming)
    allow_origin: '*', // Allow all origins for HTTP requests
  },
};

const nms = new NodeMediaServer(config);

nms.on('preConnect', (id, args) => {
  console.log('[NodeMediaServer] preConnect id=', id, 'args=', args);
});

nms.on('postPlay', (id, streamPath, args) => {
  console.log('[NodeMediaServer] postPlay id=', id, 'streamPath=', streamPath, 'args=', args);
});

nms.on('httpRequest', (req, res) => {
  // Set CORS headers for all HTTP requests handled by NodeMediaServer
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
});

nms.run(); // Start NodeMediaServer

// Set up Express routes for HTTP requests
app.get('/', (req, res) => {
  res.send('Welcome to the Streaming Server');
});

// Add any additional routes you want with Express
app.get('/info', (req, res) => {
  res.json({ message: 'RTMP Streaming Server is running!' });
});

// Serve static files or additional endpoints if needed
app.use('/static', express.static('public'));

// Start Express server on a different port (e.g., 3000)
const port = 3000;
app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});
