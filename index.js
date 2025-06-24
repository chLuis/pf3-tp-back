const express = require('express');
const cors = require('cors');

const routerProductos = require('./src/productos/productos.routes')
const routerSocios = require('./src/socios/socios.routes')
const routerLogin = require('./src/login/login.routes')

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;

app.use(cors());

//Creacion de la ruta para productos, usuarios y socios
app.use('/productos', routerProductos)
app.use('/socios', routerSocios)
app.use('/login', routerLogin)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
