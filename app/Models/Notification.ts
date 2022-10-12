import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column , computed} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Notification extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column()
  public description: string

  
  @column({ serializeAs: null })
  public notificationCategory: 'comments'|'like'


  @column({ serializeAs: null })
  public userId: number

  
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  
  @column( {serializeAs: null })
  public userReferenceId: number

  
  @belongsTo(() => User)
  public user_reference: BelongsTo<typeof User>
  
  @computed()
  public get date(){
    return this.createdAt.toFormat('dd LLL yyyy')
  }
  

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

}
