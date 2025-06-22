const Router = require('express');
const { getTodosSociosController, postAgregarTiempoSociosController, postNuevoSociosController, deleteSociosController } = require('./socios.controller');

const route = Router();

route.get('/', getTodosSociosController)
route.post('/', postNuevoSociosController)
route.delete('/:id_socio', deleteSociosController)
route.post('/agregar-tiempo', postAgregarTiempoSociosController)



module.exports = route;