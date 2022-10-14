import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import MediaStoreValidator from "App/Validators/Post/Media/StoreValidator"
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'

export default class MediasController {
 
  public async store({ request, response, auth, params }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { file } = await request.validate(MediaStoreValidator)
      const post = await Post.findOrFail(params.id)

      if (auth.user!.id !== post.userId) {
        return response.unauthorized()
      }

      post.useTransaction(trx)

      const searchPayload = {
        ownerId: auth.user!.id,
        fileCategory: 'post' as any,
      }
      const savePayload = {
        fileCategory: 'post',
        fileName: `${cuid()}.${file.extname}`
      }
      //@ts-ignore
      const media = await post.related('image').updateOrCreate(searchPayload, savePayload)

      await file.move(Application.tmpPath('uploads'), {
        name: media.fileName
      })
    })
  }

}
