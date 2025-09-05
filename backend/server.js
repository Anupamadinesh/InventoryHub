const express = require('express');
const cors = require('cors');
const inventoryRoutes = require('./routes/inventory');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Use inventory routes
app.use('/api/inventory', inventoryRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: "InventoryHub Backend Running" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
