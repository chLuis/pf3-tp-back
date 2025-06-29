const Router = require('express');
const { getUsuariosController, postUsuariosController, patchUsuariosController, deleteUsuariosController, resetPasswordUsuariosController, blockUnblockUsuariosController } = require('./usuarios.controller');

const route = Router();

route.get('/', getUsuariosController)
route.post('/', postUsuariosController);
route.patch('/', patchUsuariosController)
route.delete('/:id_usuario', deleteUsuariosController)
route.post('/reset-password/:id_usuario', resetPasswordUsuariosController)
route.post('/block-unblock/:id_usuario', blockUnblockUsuariosController)


module.exports = route;