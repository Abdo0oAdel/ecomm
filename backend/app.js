require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authenticateToken, authorizeRole } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function to read users
const readUsers = () => {
  const data = fs.readFileSync(path.join(__dirname, 'users.json'), 'utf8');
  return JSON.parse(data);
};

// Helper function to write users
const writeUsers = (users) => {
  fs.writeFileSync(
    path.join(__dirname, 'users.json'),
    JSON.stringify(users, null, 2)
  );
};

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'E-commerce Backend API' });
});

// Get all users
app.get('/api/users', (req, res) => {
  try {
    const users = readUsers();
    // Remove passwords from response
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read users' });
  }
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === req.params.id);
    if (user) {
      const { password, ...safeUser } = user;
      res.json(safeUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to read user' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare password (in production, use bcrypt.compare for hashed passwords)
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'Strict', // Adjust as necessary
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const { password: _, ...safeUser } = user;
    res.json({
      success: true,
      user: safeUser
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const users = readUsers();
    const { email, username, password, firstName, lastName } = req.body;

    // Validate required fields
    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    if (users.some(u => u.username === username)) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // In production, hash the password: const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: String(users.length + 1),
      username,
      email,
      password, // In production, store hashedPassword
      firstName: firstName || '',
      lastName: lastName || '',
      phone: req.body.phone || '',
      address: req.body.address || {},
      role: 'customer',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        username: newUser.username
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'Strict', // Adjust as necessary
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const { password: _, ...safeUser } = newUser;
    res.status(201).json({ success: true, user: safeUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Verify token endpoint (for checking if user is still authenticated)
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
});

// Logout endpoint (client-side will remove token, but we can blacklist tokens in production)
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
});

// Protected route example - Get current user profile
app.get('/api/auth/me', authenticateToken, (req, res) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

// Protected route - Update user profile
app.put('/api/auth/me', authenticateToken, (req, res) => {
  try {
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Don't allow changing email, id, role, or password through this endpoint
    const { email, id, role, password, ...updateData } = req.body;

    users[userIndex] = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    writeUsers(users);

    const { password: _, ...safeUser } = users[userIndex];
    res.json({ success: true, user: safeUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Admin-only route example - Get all users with full details
app.get('/api/admin/users', authenticateToken, authorizeRole('admin'), (req, res) => {
  try {
    const users = readUsers();
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read users' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
