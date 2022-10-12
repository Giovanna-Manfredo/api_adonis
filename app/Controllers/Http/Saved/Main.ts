import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Saved from 'App/Models/Saved';
import User from 'App/Models/User';

export default class SavedController {
  public async store({ params,  auth}: HttpContextContract) {
    await Post.findOrFail(params.id)
    const user = await User.findOrFail(auth.user!.id)
  
    const saved = await Saved.updateOrCreate({userId: user!.id, postId: params.id},{saved:params.bool})
    
    return saved
  }
}
