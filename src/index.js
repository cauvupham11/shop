const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser'); 
const cors = require('cors');
dotenv.config();

const app = express();

app.use(express.json()); 

app.use(cors());

const userRoutes = require('./routes/UserRoutes');
const productRoutes = require('./routes/ProductRoutes');

app.use('/users', userRoutes);
app.use('/products', productRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
