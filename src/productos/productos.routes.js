const Router = require("express");
const {
  getTodosProductosController,
  getCategoriasController,
  postCategoriasController,
  patchCategoriasController,
  deleteCategoriasController,
  getImagenesController,
  postImagenesController,
  patchImagenesController,
  deleteImagenesController,
  getDescuentosController,
  postDescuentosController,
  patchDescuentosController,
  deleteDescuentosController,
  postProductosController,
  patchProductosController,
  deleteProductosController,
  controllerGetProductoId
} = require("./productos.controller");

const route = Router();

route.get('/producto-detalle/:id', controllerGetProductoId);
route.get("/", getTodosProductosController);
route.post('/', postProductosController);
route.patch('/:id_producto', patchProductosController);
route.delete('/:id_producto', deleteProductosController);
//Categorias
route.get("/categorias", getCategoriasController);
route.post("/categorias", postCategoriasController);
route.patch("/categorias/:id_categoria", patchCategoriasController);
route.delete("/categorias/:id_categoria", deleteCategoriasController);
//Imagenes
route.get("/imagenes", getImagenesController);
route.post("/imagenes", postImagenesController);
route.patch("/imagenes/:id_imagen", patchImagenesController);
route.delete("/imagenes/:id_imagen", deleteImagenesController);
//Descuentos
route.get("/descuentos", getDescuentosController);
route.post("/descuentos", postDescuentosController);
route.patch("/descuentos/:id_descuento", patchDescuentosController);
route.delete("/descuentos/:id_descuento", deleteDescuentosController);

module.exports = route;