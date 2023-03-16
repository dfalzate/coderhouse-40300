import mongoose from 'mongoose'

export class CRUD {
  constructor(model) {
    this.model=model
  }

  async create(data){
    try {
      const response = await this.model.create(data)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  async getOne(id){
    try {
      const response = await this.model.findById(id)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  async getMany(){
    try {
      const response = await this.model.find()
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  async update(id,data){
    try {
      const response = await this.getOne(id)
      if(!response) throw new Error('No encontrado')
      Object.assign(response, data)
      response.save()
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  async delete(id){
    try {
      const _id = mongoose.Types.ObjectId(id)
      const response = await this.model.findByIdAndDelete(_id)
      return response
    } catch (error) {
      throw new Error(error.message)
    }
  }
}