import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Preference from 'App/Models/Preference'
import Tag from 'App/Models/Tag'
import StoreValidator from 'App/Validators/User/Preferences/StoreValidator'

export default class PreferencesController {

  public async store({ request, auth }: HttpContextContract) {
      const {id} = await request.validate(StoreValidator)
      const tag = await Tag.findOrFail(id)
      const preference = await Preference.create({
        tagId:tag.id,
        userId: auth.user!.id
      })

      await preference.save()

      return 
  }

}
