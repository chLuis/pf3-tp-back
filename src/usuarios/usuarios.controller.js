const { getUsuariosService, postUsuariosService, patchUsuariosService, deleteUsuariosService, blockUnblockUsuariosService, resetPasswordUsuariosService } = require('./usuarios.service')


const getUsuariosController = async (req, res) => {
  try {
    const response = await getUsuariosService()
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}


const postUsuariosController = async (req, res) => {
  const usuario = req.body;
  try {
    const response = await postUsuariosService(usuario)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const patchUsuariosController = async (req, res) => {
  const usuario = req.body;
  try {
    const response = await patchUsuariosService(usuario)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const deleteUsuariosController = async (req, res) => {
  const id_usuario = req.params.id_usuario
  try {
    const response = await deleteUsuariosService(id_usuario)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const resetPasswordUsuariosController = async (req, res) => {
  const id_usuario = req.params.id_usuario
  try {
    const response = await resetPasswordUsuariosService(id_usuario)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const blockUnblockUsuariosController = async (req, res) => {
  const id_usuario = req.params.id_usuario
  console.log(id_usuario);
  try {
    const response = await blockUnblockUsuariosService(id_usuario)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

module.exports = { getUsuariosController, postUsuariosController, patchUsuariosController, deleteUsuariosController, resetPasswordUsuariosController, blockUnblockUsuariosController };