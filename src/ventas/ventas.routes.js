const Router = require('express');
const { getTodasVentasController, postVentasController, patchVentasController, deleteVentasController, getTodasVentasRangeController } = require('./ventas.controller');

const route = Router();

route.get('/', getTodasVentasController)
route.get('/:intervalo', getTodasVentasRangeController)
route.post('/', postVentasController);
route.patch('/:id_venta', patchVentasController)
route.delete('/:id_venta', deleteVentasController)


module.exports = route;