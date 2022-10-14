import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AvatarValidator  from 'App/Validators/User/Avatar/StoreValidator'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import fs from 'fs'

export default class UserAvatarController {
  public async update({ request, auth }: HttpContextContract) {
    const response = await Database.transaction(async (trx) => {
      const { file } = await request.validate(AvatarValidator)

      const user = auth.user!.useTransaction(trx)

      const searchPayload = {
        ownerId: user.id,
        fileCategory: 'avatar' as any,
      }
      const savePayload = {
        fileCategory: 'avatar' as any,
        fileName: `${new Date().getTime()}.${file.extname}`
      }
      
      const avatar = await user.related('avatar').updateOrCreate(searchPayload, savePayload)

      await file.move(Application.tmpPath('uploads'), {
        name: avatar.fileName,
        overwrite: true
      })

      return avatar
    })

    return response
  }

  public async destroy({ auth }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const user = auth.user!.useTransaction(trx)

      const avatar = await user
        .related('avatar')
        .query()
        .where({ fileCategory: 'avatar' })
        .firstOrFail()

      await avatar.delete()

      fs.unlinkSync(Application.tmpPath('uploads', avatar.fileName))
    })
  }
}