import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo, hasOne, HasOne, manyToMany, ManyToMany, hasMany, HasMany, computed } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import File from './File'
import Tag from './Tag'
import Saved from './Saved'
import Liked from './Liked'
import Comment from './Comment'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  
  @computed()
  public get description_preview(){
    
    const preview = this.description
    if(!preview){
      return ""
    }
    if(preview.length <= 250){
      return this.description
    }else{
     return this.description.substring(0, 250)+"..."
    }
  }

  @column({serializeAs:null})
  public userId: number

  @computed()
  public get date(){
    return this.createdAt.toFormat('dd LLL yyyy')
  }

  @computed()
  public get saved(){
    
    try{
      const saved =  this.saveds[0]['saved']
      if(saved == true){
        return true
      }else{
        return false
      } 

    }catch(e){
      return false
    }

  }

  
  @computed()
  public get liked(){
    
    try{
      const liked =  this.likeds[0]['liked']
      if(liked == true){
        return true
      }else{
        return false
      } 

    }catch(e){
      return false
    }

  }
  @column.dateTime({ autoCreate: true})
  public createdAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasOne(() => File, {
    foreignKey: 'ownerId',
    onQuery: (query) => query.where({ fileCategory: 'post' })
  })
  public image: HasOne<typeof File>

  @hasMany(() => Saved, {serializeAs: null})
  public saveds: HasMany<typeof Saved>

  
  @hasMany(() => Liked, {serializeAs: null})
  public likeds: HasMany<typeof Liked>

  @column({serializeAs:null})
  public tagId: number

  @belongsTo(() => Tag, {})
  public tag: BelongsTo<typeof Tag>

  @manyToMany(() => User, {
    pivotTable: 'reports',
  })
  public reports: ManyToMany<typeof User>

  @hasMany(() => Comment, {
  })
  public comments: HasMany<typeof Comment>
}
