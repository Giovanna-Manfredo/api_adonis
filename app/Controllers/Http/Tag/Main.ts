import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Tag from 'App/Models/Tag'
import StoreValidator from 'App/Validators/Tag/StoreValidator'

export default class TagsController {
  public async index({params}: HttpContextContract) {
    
      const posts = await Post.query().where({tagId:params.id_forum})
      .preload('user', (query) =>{
        query.preload('avatar')
      })
      .preload('image')
      .preload('tag', (query) =>{
        query.preload('forum')
      } ).orderBy('created_at', 'desc')

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
    
  



  public async create({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const tags = await Tag.firstOrCreate(data)
    await tags.save()
    return tags
  }

}
