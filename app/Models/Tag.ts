import { BaseModel, BelongsTo, belongsTo, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Forum from './Forum'
import Post from './Post'
import User from './User'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ serializeAs: null })
  public forumId: number
  
  @belongsTo(() => Forum)
  public forum: BelongsTo<typeof Forum>

  @manyToMany(() => User, {
    pivotTable: 'preferences',
  })
  public users: ManyToMany<typeof User>

  @manyToMany(() => Post, {
    pivotTable: 'topics',
  })
  public posts: ManyToMany<typeof Post>

}
