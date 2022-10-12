import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/User/StoreValidator'
import Database from '@ioc:Adonis/Lucid/Database'
import UpdateValidator from 'App/Validators/User/UploadValidator'

export default class UsersController {
 
  public async store({ request }: HttpContextContract) {
    const response = await Database.transaction(async (trx) => {
      const data = await request.validate(StoreValidator)
      const user = await User.create(data)
      user.useTransaction(trx)
      await user.save()
      return {"userId": user.id}
    })
    return response
  }

  public async show({auth }: HttpContextContract) {
    const user = await User.query().where({ id: auth.user!.id}).preload('avatar')
    return user

}

public async update({request, auth}: HttpContextContract) {
  const data = await request.validate(UpdateValidator)
  
  const user = await User.findOrFail(auth.user!.id)
  
  user.name = data.name;

  user.save()

  return user
}
}
