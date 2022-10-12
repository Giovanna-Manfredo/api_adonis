import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import SearchValidator from 'App/Validators/Post/SearchValidator'

export default class SearchController {
  public async index({request}: HttpContextContract) {
    const data = await request.validate(SearchValidator)
    const posts = await Post.query()
    .orWhere((query)=>{
      query.where('title', 'like', '%'+data.term+'%')
      .orWhere('description', 'like', '%'+data.term+'%')
    }).preload('tag', (query) =>{
      query.preload('forum')
    }).preload('image').preload('user', (query) =>{
      query.preload('avatar')
    })
  
    return posts.map((post) => post.serialize({
      fields: {
        omit: ['description','created_at'],
      },
      relations:{
        
          users: {
            fields: ['id', 'name', 'username', ]
          }
        
      }}))
  }
}
  

