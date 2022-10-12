import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/Preference/StoreValidator'
import Tag from 'App/Models/Tag'
import Preference from 'App/Models/Preference'

export default class PreferencesController {
  public async store({ request, }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.findOrFail(data.id)

    const preferences = data.preference_ids

    for ( let i = 0; i < preferences.length; i++){
        await Tag.findOrFail(preferences[i])
        await Preference.firstOrCreate({userId:data.id, tagId:preferences[i]})
    }
    
    return user
}

}
