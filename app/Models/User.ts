import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasOne, HasOne, hasMany,HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import File from './File'
import Post from './Post'
import Tag from './Tag'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public username: string

  @column({ serializeAs: null })
  public type: 'admin'|'normal'

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ serializeAs: null })
  public rememberMeToken?: string


  @beforeSave()
  public static async hashPassword (User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where({ fileCategory: 'avatar' })
  })
  public avatar: HasOne<typeof File>

  
  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  //seguidores
  @manyToMany(() => User, {
    pivotTable: 'follows',
    pivotForeignKey: 'following_id',
    pivotRelatedForeignKey: 'follower_id'
  })
  public followers: ManyToMany<typeof User>

  //seguindo
  @manyToMany(() => User, {
    pivotTable: 'follows',
    pivotForeignKey: 'follower_id',
    pivotRelatedForeignKey: 'following_id'
  })
  public following: ManyToMany<typeof User>

  @manyToMany(() => Tag, {
    pivotTable: 'preferences',
    pivotForeignKey: 'user_id',

  })
  public tags: ManyToMany<typeof Tag>

  @manyToMany(() => Post, {
    pivotTable: 'reports',
  })
  public reports: ManyToMany<typeof Post>

  @manyToMany(() => Post, {
    pivotTable: 'saveds',
  })
  public saved: ManyToMany<typeof Post>


}
