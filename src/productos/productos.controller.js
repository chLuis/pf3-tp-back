const { getTodosProductosService } = require("./productos.service");

const getTodosProductosController = async (req, res) => {
  try {
    const response = await getTodosProductosService()
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


module.exports = { getTodosProductosController };