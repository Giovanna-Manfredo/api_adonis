import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Liked from 'App/Models/Liked'
import Notification from 'App/Models/Notification'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class MainsController {
  public async store({ params,  auth}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const user = await User.findOrFail(auth.user!.id)
  
    const liked = await Liked.updateOrCreate({userId: user!.id, postId: params.id},{liked:params.bool})
    await Notification.create({userId:post.userId, userReferenceId:auth.user!.id, notificationCategory:'like', description:"@"+  auth.user!.username +" curtiu sua postagem '"+ post.title+"'"})
    return liked
  }
}
