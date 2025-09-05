const express = require('express');
const router = express.Router();

// Sample in-memory inventory data
let inventory = [
  { id: 1, name: "Laptop", quantity: 10 },
  { id: 2, name: "Keyboard", quantity: 25 },
  { id: 3, name: "Mouse", quantity: 30 }
];

// GET all items
router.get('/', (req, res) => {
  res.json({ success: true, data: inventory });
});

// GET single item
router.get('/:id', (req, res) => {
  const item = inventory.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ success: false, message: "Item not found" });
  res.json({ success: true, data: item });
});

// POST new item
router.post('/', (req, res) => {
  const { name, quantity } = req.body;
  const newItem = { id: inventory.length + 1, name, quantity };
  inventory.push(newItem);
  res.json({ success: true, data: newItem });
});

// PUT update item
router.put('/:id', (req, res) => {
  const item = inventory.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ success: false, message: "Item not found" });
  item.name = req.body.name || item.name;
  item.quantity = req.body.quantity || item.quantity;
  res.json({ success: true, data: item });
});

// DELETE item
router.delete('/:id', (req, res) => {
  inventory = inventory.filter(i => i.id !== parseInt(req.params.id));
  res.json({ success: true, message: "Item deleted" });
});

module.exports = router;
