const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: '*', // Allow all origins for HTTP requests
  },
};

var nms = new NodeMediaServer(config);

nms.on('preConnect', (id, args) => {
  console.log('[NodeMediaServer] preConnect id=', id, 'args=', args);
});

nms.on('postPlay', (id, streamPath, args) => {
  console.log('[NodeMediaServer] postPlay id=', id, 'streamPath=', streamPath, 'args=', args);
});

nms.on('httpRequest', (req, res) => {
  // Set CORS headers for all HTTP requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
});

nms.run();
