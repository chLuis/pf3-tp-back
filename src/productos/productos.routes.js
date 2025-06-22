const Router = require('express');
const { getTodosProductosController, getCategoriasController, postCategoriasController, patchCategoriasController, deleteCategoriasController } = require('./productos.controller');

const route = Router();

route.get('/', getTodosProductosController)
//route.post('/', postProductosController)
route.get('/categorias', getCategoriasController)
route.post('/categorias', postCategoriasController)
route.patch('/categorias/:id_categoria', patchCategoriasController)
route.delete('/categorias/:id_categoria', deleteCategoriasController)


module.exports = route;