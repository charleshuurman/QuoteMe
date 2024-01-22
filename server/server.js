const express = require('express');
const app = express();
const quoteRoutes = require('./routes/quoteRoutes');
const PORT = process.env.PORT || 3004;

app.use(express.json());

app.use('/api/quotes', quoteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
