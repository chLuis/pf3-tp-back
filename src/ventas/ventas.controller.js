const { getTodasVentasService, postVentasService, patchVentasService, deleteVentasService, getTodasVentasRangeService } = require('./ventas.service')


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

const getTodasVentasRangeController = async (req, res) => {
  //la confeccion de la ruta es fecha_inicio+between+fecha_fin para poder tomar las 2 fechas separamos usando la palabra between como ayuda
  const intervalo = req.params.intervalo.split('between')
  const inicio = intervalo[0]
  const fin = intervalo[1]

  try {
    const response = await getTodasVentasRangeService(inicio, fin)
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

module.exports = { getTodasVentasController, getTodasVentasRangeController, postVentasController, patchVentasController, deleteVentasController };