import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Post from './Post'

export default class Saved extends BaseModel {
  @column({ isPrimary: true ,  serializeAs: null })
  public id: number

  @column()
  public saved: boolean

  @column({ serializeAs: null })
  public userId: number

  @column({ serializeAs: null })
  public postId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

}
