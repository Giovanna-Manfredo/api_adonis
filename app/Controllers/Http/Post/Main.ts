import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import{UpdateValidator, StoreValidator} from 'App/Validators/Post/Index'
import Post from 'App/Models/Post'
import Application from '@ioc:Adonis/Core/Application'

import fs from 'fs'
import Preference from 'App/Models/Preference'

import Saved from 'App/Models/Saved'

export default class PostsController {
  public async index({auth, params}: HttpContextContract) {
    
    if(params.type_list == 'feed'){
      
      const tags = await Preference.query().where({ userId: auth.user!.id})
      const all = []

      for (let i = 0; i < tags.length; i++) {
         const tag: Number = tags[i]['tagId']
         //@ts-ignore
         all.push(tag)
      }

      const post = await Post.query()
        
        .whereIn('tag_id', all)
        .preload('image')
        .preload('user', (query) => {
          query.preload('avatar')
        })  
        .preload('tag', (query) => {
          query.preload('forum')
          
          
        })
        .preload('saveds', (query) => {
        query.where({userId: auth.user!.id, saved: true})
        
        
      }).preload('likeds', (query) => {
        query.where({userId: auth.user!.id, liked: true})
        
      }).orderBy('created_at','desc')
      
      return post.map((post) => post.serialize({
        fields: {
          omit: ['description','created_at'],
        },
        relations:{
          
            users: {
              fields: ['id', 'name', 'username', ]
            }
          
        }}))
    }


    if(params.type_list == 'saved'){

      const user = await Saved.query().where({userId:auth.user!.id, saved:true})
      .preload('post',(query) => {
        query.preload('image')
        query.preload('user', (query) =>{
          query.preload('avatar')
        })
        query.preload('tag',(query)=>{
          query.preload('forum')
        })
      }).orderBy('id','desc')

      return user.map((user) => user.serialize({
        fields: {
          omit: ['saved'],
        },
        relations:{
          
            post: {
              fields: {
                omit:['description', 'created_at' ]
              }
            }
          
        }
      }))
    }

    
    if(params.type_list == 'myself'){

    const user = auth.user!

    await user.load('posts', (query) => {

      query.orderBy('id', 'desc')
      query.preload('image')
      .preload('tag', (query) => {
        query.preload('forum')
        
        
      })
  
    })

    return user.posts.map((post) => post.serialize({
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
  


  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const post = await auth.user!.related('posts').create(data)
    post.save()
    

    return { "post_id":post.id}
  }

  public async show({ params}: HttpContextContract) {
  
    const post = await Post
    .query()
    .where({id:params.id})
    .preload('user', (query)=>{
      query.preload('avatar')
    })
    .preload('image')
    .preload('tag', (query)=>{
      query.preload('forum')
    })
    .preload('comments', (query)=>{
      query.preload('user', (query)=>{
        query.preload('avatar')
      })
      query.orderBy('id','desc')
    })
    .first()
    //@ts-ignore
    return post.serialize({
      fields: {
        pick: ['id','title','description','date',],
        
      },
      relations: {
        user: {
          fields: ['id', 'name', 'username', ],
        },
    }})
    
  }
 

  public async update({ request, response, params, auth }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    const post = await Post.findOrFail(params.id)

    if (auth.user!.id !== post.userId) {
      return response.unauthorized()
    }

    await post.merge(data).save()

    return post
  }


  public async destroy({ params , auth , response}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    if (auth.user!.id !== post.userId) {
      return response.unauthorized()
    }

    await post.load('image')

    if (post.image) {
      fs.unlinkSync(Application.tmpPath('uploads', post.image.fileName))

      await post.image.delete()
    }

    await post.delete()
  }
}
