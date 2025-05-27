import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(morgan('combined'))

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'APEX.VERSE API Server', 
    version: '1.0.0',
    status: 'running' 
  })
})

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Mock API endpoints
app.get('/api/products', (req, res) => {
  res.json({
    products: [
      {
        id: 1,
        name: { de: 'Schwarze Jeans', en: 'Black Jeans', uk: 'Чорні джинси', ru: 'Черные джинсы' },
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
        inStock: true
      },
      {
        id: 2,
        name: { de: 'Premium Hoodie', en: 'Premium Hoodie', uk: 'Преміум худі', ru: 'Премиум худи' },
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
        inStock: true
      }
    ],
    total: 2
  })
})

app.post('/api/ai/search', (req, res) => {
  const { query } = req.body
  res.json({
    query,
    results: [
      {
        id: 1,
        name: 'AI рекомендация на основе: ' + query,
        confidence: 95,
        reason: 'Идеально подходит по описанию'
      }
    ]
  })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  })
})

app.use('*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' })
})

app.listen(PORT, () => {
  console.log(`🚀 APEX.VERSE Backend running on port ${PORT}`)
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
})