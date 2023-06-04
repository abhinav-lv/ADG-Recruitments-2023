require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')

// Import route handlers
const authRoutes = require('./routes/authRoutes')
const questionRoutes = require('./routes/questionRoutes')
const responseRoutes = require('./routes/responseRoutes')
const testRoutes = require('./routes/testRoutes')

// Import Redis Session Store
const {redisStore} = require('./sessions/RedisStore');

// Connect to MongoDB
mongoose.connect(`${process.env.MONGO_URI}`)
const db = mongoose.connection
db.once('open', () => console.log('Connected to MongoDB'))
db.on('error', (error) => console.error(error.message))

// Initialize express app
const app = express()

// Middleware
app.use(express.json())
app.use(express.static(process.cwd()+'/client/build'))
app.use(session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, maxAge: 2*60*60*1000, httpOnly: true} // 2 hours
}));

// Root route
app.get('/api', (req,res) => res.send('Server root route'))

// Auth
app.use('/api/auth', authRoutes)

// Questions
app.use('/api/questions', questionRoutes)

// Responses
app.use('/api/responses', responseRoutes)

// Test
app.use('/api/test', testRoutes)

// Serve React static files
app.get('*', (req,res) => res.sendFile(process.cwd()+'/client/build/index.html'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));