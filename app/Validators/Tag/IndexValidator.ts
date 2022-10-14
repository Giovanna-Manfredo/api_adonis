import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class IndexValidator {
  constructor() {}

  public schema = schema.create({
    forum_id: schema.number.optional()
  })

  
  public messages: CustomMessages = {}
}
