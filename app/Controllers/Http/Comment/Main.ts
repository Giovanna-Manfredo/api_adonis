import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Notification from 'App/Models/Notification'
import Post from 'App/Models/Post'
import StoreValidator from 'App/Validators/Comments/StoreValidator'

export default class CommentController {
  public async store({ params, request, auth}: HttpContextContract) {

    const data = await request.validate(StoreValidator)
    
    const post = await Post.findOrFail(params.id)
  
    const saved = await Comment.create({userId:auth.user!.id, postId: params.id, content: data.content})
    
    await Notification.create({userId:post.userId, userReferenceId: auth.user!.id, notificationCategory:'comments', description:"@"+  auth.user!.username +" comentou na sua postagem '"+ post.title+"'"})
    return saved
  }
}
