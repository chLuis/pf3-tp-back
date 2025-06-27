const { getTodasVentasService, postVentasService, patchVentasService, deleteVentasService } = require('./ventas.service')


const getTodasVentasController = async (req, res) => {
  try {
    const response = await getTodasVentasService()
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


const postVentasController = async (req, res) => {
  const venta = req.body;
  try {
    const response = await postVentasService(venta)
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

const patchVentasController = async (req, res) => {
  const venta = req.body;
  const id_venta = req.params.id_venta
  try {
    const response = await patchVentasService(venta, id_venta)
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

const deleteVentasController = async (req, res) => {
  const id_venta = req.params.id_venta
  try {
    const response = await deleteVentasService(id_venta)
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

module.exports = { getTodasVentasController, postVentasController, patchVentasController, deleteVentasController };