import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/Preference/StoreValidator'
import Tag from 'App/Models/Tag'
import Preference from 'App/Models/Preference'
import UpdateValidator from 'App/Validators/Preference/UpdateValidator'

export default class PreferencesController {
  public async update({ request,auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    await User.findOrFail(auth.user!.id)

    const preferences = data.preference_ids

    for ( let i = 0; i < preferences.length; i++){
        await Tag.findOrFail(preferences[i])
        await Preference.firstOrCreate({userId:auth.user!.id, tagId:preferences[i]})
    }

  }
  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.findOrFail(data.id)

    const preferences = data.preference_ids

    for ( let i = 0; i < preferences.length; i++){
        await Tag.findOrFail(preferences[i])
        await Preference.firstOrCreate({userId:data.id, tagId:preferences[i]})
    }

    const token = await auth.attempt(user.email, data.password, { expiresIn: '30 days'})

    return token
    
    return user
}

}
