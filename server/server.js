/**
 * Curio & Co. - Permanent PostgreSQL Backend Service
 * Built with Express.js and pg (node-postgres connection pool)
 */

const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// PostgreSQL Pool Connection
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    'postgres://curio_admin:CurioPostgresSecure2026!@localhost:5432/curio_gifting_db',
  ssl: process.env.NODE_ENV === 'production' && !process.env.LOCAL_DB ? { rejectUnauthorized: false } : false,
})

// Test Connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error acquiring PostgreSQL client:', err.stack)
  } else {
    console.log('✅ Connected successfully to PostgreSQL database.')
    release()
  }
})

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Curio PostgreSQL API', timestamp: new Date() })
})

// ─── Auth Endpoints ───────────────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length === 0) {
      // Automatic dev fallback
      const role = email.includes('admin') ? 'admin' : 'customer'
      return res.json({
        user: {
          email,
          name: email.split('@')[0],
          role,
        },
        token: 'jwt-token-sample',
      })
    }
    const user = result.rows[0]
    res.json({ user, token: 'jwt-token-sample' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// ─── Products Endpoints ───────────────────────────────────────────────────────
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch products' })
  }
})

app.post('/api/products', async (req, res) => {
  const { id, name, brand, category, description, price, minQty, badge, images } = req.body
  try {
    const result = await pool.query(
      `INSERT INTO products (id, name, brand, category, description, price, min_qty, badge, images)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [id, name, brand, category, description, price, minQty, badge, images]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create product' })
  }
})

app.delete('/api/products/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM products WHERE id = $1', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete product' })
  }
})

// ─── Orders Endpoints ─────────────────────────────────────────────────────────
app.get('/api/orders', async (req, res) => {
  try {
    const ordersResult = await pool.query('SELECT * FROM orders ORDER BY created_at DESC')
    const itemsResult = await pool.query('SELECT * FROM order_items')

    const orders = ordersResult.rows.map(o => ({
      ...o,
      items: itemsResult.rows.filter(i => i.order_id === o.id),
    }))
    res.json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})

app.post('/api/orders', async (req, res) => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const { id, orderNumber, customerName, customerEmail, customerCompany, customerPhone, shippingAddress, subtotal, gst, total, status, paymentMethod, items } = req.body

    const orderRes = await client.query(
      `INSERT INTO orders (id, order_number, customer_name, customer_email, customer_company, customer_phone, shipping_address, subtotal, gst, total, status, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [id, orderNumber, customerName, customerEmail, customerCompany, customerPhone, shippingAddress, subtotal, gst, total, status || 'Processing', paymentMethod || 'Corporate Net Banking']
    )

    if (items && Array.isArray(items)) {
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, product_name, product_brand, price, quantity, variant_color, image)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [id, item.productId, item.name, item.brand, item.price, item.quantity, item.variantColor, item.image]
        )
      }
    }

    await client.query('COMMIT')
    res.status(201).json(orderRes.rows[0])
  } catch (err) {
    await client.query('ROLLBACK')
    console.error(err)
    res.status(500).json({ error: 'Failed to place order' })
  } finally {
    client.release()
  }
})

app.patch('/api/orders/:id/status', async (req, res) => {
  const { status } = req.body
  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 OR order_number = $2 RETURNING *',
      [status, req.params.id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update order status' })
  }
})

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM orders WHERE id = $1 OR order_number = $1', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete order' })
  }
})

// ─── Quotes Endpoints ─────────────────────────────────────────────────────────
app.get('/api/quotes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM quotes ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch quotes' })
  }
})

app.post('/api/quotes', async (req, res) => {
  const { id, quoteNumber, companyName, gstin, industry, contactName, email, phone, selectedProducts, totalUnits, deliveryDate, brandingType, artworkReady, notes, status, estimatedTotal } = req.body
  try {
    const result = await pool.query(
      `INSERT INTO quotes (id, quote_number, company_name, gstin, industry, contact_name, email, phone, selected_products, total_units, delivery_date, branding_type, artwork_ready, notes, status, estimated_total)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
      [id, quoteNumber, companyName, gstin, industry, contactName, email, phone, JSON.stringify(selectedProducts), totalUnits, deliveryDate, brandingType, artworkReady, notes, status || 'Processing', estimatedTotal]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create quote' })
  }
})

app.patch('/api/quotes/:id/status', async (req, res) => {
  const { status } = req.body
  try {
    const result = await pool.query(
      'UPDATE quotes SET status = $1 WHERE id = $2 OR quote_number = $2 RETURNING *',
      [status, req.params.id]
    )
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update quote status' })
  }
})

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Curio PostgreSQL API running on http://localhost:${PORT}`)
})
