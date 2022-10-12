import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Report from 'App/Models/Report'

export default class ReportController {
  public async store({ params,  auth}: HttpContextContract) {
    
    await Post.findOrFail(params.id)
  
    const saved = await Report.firstOrCreate({userId:auth.user!.id, postId: params.id})
    
    return saved
  }
}
