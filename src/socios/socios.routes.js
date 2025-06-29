const Router = require('express');
const { getTodosSociosController, postAgregarTiempoSociosController, postNuevoSociosController, deleteSociosController, patchSociosController, getOneSociosController } = require('./socios.controller');

const route = Router();

route.get('/', getTodosSociosController)
route.get('/:dni', getOneSociosController)
route.post('/', postNuevoSociosController)
route.patch('/', patchSociosController)
route.delete('/:id_socio', deleteSociosController)
route.post('/agregar-tiempo', postAgregarTiempoSociosController)



module.exports = route;