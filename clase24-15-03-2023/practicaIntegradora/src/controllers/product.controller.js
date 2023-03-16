import productService from '../services/product.service.js'

class ProductController {
  async create(req,res){
    try {
      const data = req.body
      const response = await productService.create(data)
      res.status(200).json({product:response})
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
  async getOne(req,res){
    try {
      const {id}= req.params
      const response = await productService.getOne(id)
      res.status(200).json({product:response})
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
  async getMany(req,res){
    try {
      const response = await productService.getMany()
      res.status(200).json({products:response})
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
  async update(req,res){
    try {
      const data = req.body
      const { id } = req.params
      const response = await productService.update(id, data)
      res.status(200).json({product:response})
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
  async delete(req,res){
    try {
      const { id } = req.params
      const response = await productService.delete(id)
      res.status(200).json({product:response})
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

export default new ProductController()