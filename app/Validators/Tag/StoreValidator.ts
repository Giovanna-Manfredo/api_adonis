import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'


export default class StoreValidator {
  constructor() {}

  public schema = schema.create({
    name: schema.string({trim:true}),
    forum_id: schema.number()
  })

  
  public messages: CustomMessages = {}
}
