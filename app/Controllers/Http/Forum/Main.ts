import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Forum from 'App/Models/Forum'

export default class MainsController {
  public async index({}: HttpContextContract) {
    const foruns = await Forum.query().preload('tags')
    return foruns
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['name'])
    const forum = await Forum.firstOrCreate(data)
    await forum.save()
    return forum
  }

  public async show({}: HttpContextContract) {}

}

