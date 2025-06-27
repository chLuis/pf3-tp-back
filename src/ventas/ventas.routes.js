const Router = require('express');
const { getTodasVentasController, postVentasController, patchVentasController, deleteVentasController } = require('./ventas.controller');

const route = Router();

route.get('/', getTodasVentasController)
route.post('/', postVentasController);
route.patch('/:id_venta', patchVentasController)
route.delete('/:id_venta', deleteVentasController)


module.exports = route;