
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const Message = require('./models/Message');
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(bodyParser.json());


connectDB();

// --- Socket.IO Event Handling ---
io.on('connection', async (socket) => { // Make connection handler async
  console.log(`[Socket.IO] New user connected: ${socket.id}`);

  // Fetch and send recent messages to the newly connected client
  try {
    const messages = await Message.find().sort({ timestamp: 1 }).limit(50); // Get last 50 messages
    socket.emit('initialMessages', messages);
    console.log(`[MongoDB] Sent ${messages.length} initial messages to new client.`);
  } catch (err) {
    console.error('[MongoDB Error] Error fetching initial messages:', err);
  }


  socket.on('userJoined', (username) => {
    console.log(`[Socket.IO] User ${username} has joined the chat.`);

  });


  // Handle incoming messages from clients
  socket.on('sendMessage', async (data) => {
    // 'data' now contains { sender: 'username', content: 'message text' }
    console.log(`[Socket.IO] Received message from ${data.sender}: ${data.content}`);

    try {
      const message = new Message({
        sender: data.sender, // Save the sender (username)
        content: data.content,
        timestamp: new Date().toISOString() // Server-side timestamp
      });
      await message.save();
      console.log('[MongoDB] Message saved to DB:', message.content);


      io.emit('newMessage', message); 
    } catch (err) {
      console.error('[MongoDB Error] Error saving message:', err);
    }
  });

  // Handle typing indicator from clients
  socket.on('typing', (sender) => {
    socket.broadcast.emit('typing', sender);
    console.log(`[Socket.IO] User typing: ${sender}`);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log(`[Socket.IO] User disconnected: ${socket.id}`);
  });
});


app.get('/', (req, res) => {
  res.status(200).send('Chat backend server is running and Socket.IO is active.');
});
app.post('/send-as-user', async (req, res) => {
  const { sender, content } = req.body;

  if (!sender || !content) {
    return res.status(400).json({ error: 'Sender and content are required.' });
  }

  try {
    const message = new Message({ 
      sender: sender,
      content: content,
      timestamp: new Date().toISOString()
    });
    await message.save();
    console.log(`[HTTP API] Programmatically sent message from ${sender}: ${content}`);
    io.emit('newMessage', message); 
    res.status(200).json({ message: 'Message sent successfully', data: message });
  } catch (err) {
    console.error('[HTTP API Error] Error sending programmatic message:', err);
    res.status(500).json({ error: 'Failed to send message', details: err.message });
  }
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`[Server] Chat backend running on port ${PORT}`);
});