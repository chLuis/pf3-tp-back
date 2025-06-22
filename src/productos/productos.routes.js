const Router = require('express');
const { getTodosProductosController } = require('./productos.controller');

const route = Router();

route.get('/', getTodosProductosController)



module.exports = route;