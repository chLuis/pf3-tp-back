const Router = require('express');
const { getTodosProductosController, getCategoriasController, postCategoriasController, patchCategoriasController, deleteCategoriasController, getImagenesController, postImagenesController, patchImagenesController, deleteImagenesController } = require('./productos.controller');

const route = Router();

route.get('/', getTodosProductosController)
//route.post('/', postProductosController)
//Categorias
route.get('/categorias', getCategoriasController)
route.post('/categorias', postCategoriasController)
route.patch('/categorias/:id_categoria', patchCategoriasController)
route.delete('/categorias/:id_categoria', deleteCategoriasController)
//Imagenes
route.get('/imagenes', getImagenesController )
route.post('/imagenes', postImagenesController )
route.patch('/imagenes/:id_imagen', patchImagenesController)
route.delete('/imagenes/:id_imagen', deleteImagenesController)


module.exports = route;