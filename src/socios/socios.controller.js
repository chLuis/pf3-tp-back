const { getTodosSociosService, postAgregarTiempoSociosService, postNuevoSociosService, deleteSociosService } = require("./socios.service");

const getTodosSociosController = async (req, res) => {
  try {
    const response = await getTodosSociosService()
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error, "_____");
    return res.status(400).json(error);
  }
}

const postNuevoSociosController = async (req, res) => {
  const socio = req.body
  try {
    const response = await postNuevoSociosService(socio)
    return res.json({ 
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error, "_____");
    return res.status(400).json(error);
  }
}

const deleteSociosController = async(req, res) => {
  const {id_socio} = req.params
  try {
    const response = await deleteSociosService(id_socio)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error, "_____");
    return res.status(400).json(error);
  }

}

const postAgregarTiempoSociosController = async (req, res) => {
  const {id_socio, cantidad} = req.body
  try {
    const response = await postAgregarTiempoSociosService(id_socio, cantidad)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error, "_____");
    return res.status(400).json(error);
  }
}


module.exports = { getTodosSociosController, postAgregarTiempoSociosController, postNuevoSociosController, deleteSociosController };