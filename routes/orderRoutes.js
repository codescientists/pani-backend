const express = require("express");
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Load orders
let orders = [];
try {
  const data = fs.readFileSync('./data/orders.json', 'utf-8');
  orders = JSON.parse(data);
} catch (error) {
  console.error('Error reading orders file:', error);
}

// Helper function to find order by ID
const findOrderById = (id) => orders.find(order => order.id == id);

// Create Order
router.post('/', (req, res) => {
  try {
    console.log(orders)
    console.log({...req.body})
    // Add the new order to the array
    orders.push({...req.body, id: uuidv4()});

    // Write the updated orders back to the JSON file
    fs.writeFileSync("./data/orders.json", JSON.stringify(orders, null, 2));

    res.status(200).json({ message: "Order Placed Successfully" });
  } catch (e) {
    res.status(400).json({error: e.errors, body: req.body});
  }
});

// Get Order
router.get('/:id', (req, res) => {
  const order = findOrderById(req.params.id);
  
  if (!order) return res.status(404).json({ message: 'Order not found' });

  res.json(order);
});

// Update Order
router.put('/:id', (req, res) => {
  try {
    const updatedOrder = req.body;

    // Find the index of the order to be updated
    const orderIndex = orders.findIndex(order => order.id === req.params.id);

    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order
    orders[orderIndex] = { ...updatedOrder, id: req.params.id };

    // Write the updated orders back to the JSON file
    fs.writeFileSync('./data/orders.json', JSON.stringify(orders, null, 2));

    res.status(200).json({ message: 'Order updated successfully' });
  } catch (e) {
    res.status(400).json(e.errors);
  }
});
  

// Delete Order
router.delete('/:id', (req, res) => {
  const orderIndex = orders.findIndex(order => order.id === Number(req.params.id));
  if (orderIndex === -1) return res.status(404).json({ message: 'Order not found' });
  
  orders.splice(orderIndex, 1);
  res.status(204).send();
});

// List Orders
router.get('/', (req, res) => {
  res.json(orders);
});


module.exports = router;
