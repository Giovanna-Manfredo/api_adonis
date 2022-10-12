import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Models/Notification'

export default class NotificationController {
  public async index({auth}: HttpContextContract) {

    const notifications = await Notification.query().where({userId:auth.user!.id})
      
    .preload('user_reference', (query)=>{
      query.preload('avatar')
    }).orderBy('id','desc')

    return notifications
  }


}
