// require('dotenv').config();

// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 8000;
// const cors = require('cors');
// app.use(cors());

// app.use(express.json());

// const orderRoutes = require('./routes/orderRoutes');

// app.use('/api/orders', orderRoutes);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on ${process.env.BASE_URL}:${PORT}`);
// });

const express = require("express"); 
const app = express(); 
app.get("/", (req, res) => { res.send("Express on Vercel"); }); 

const PORT = process.env.PORT || 5000;

 app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
