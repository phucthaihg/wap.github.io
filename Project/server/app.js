const express = require('express');
const cors = require('cors');
const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');

const path = require("path");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/products', productRouter);

app.use('/carts', cartRouter);


app.listen(3000, () => {console.log(`Server is running on port 3000`)});


