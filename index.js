require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => { res.send("Express on Vercel"); }); 

const orderRoutes = require('./routes/orderRoutes');

app.use('/api/orders', orderRoutes);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
