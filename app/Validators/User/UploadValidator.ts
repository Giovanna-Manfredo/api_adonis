import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class UpdateValidator {
  constructor() {}

  public schema = schema.create({
    name: schema.string({trim:true}),

  })

  
  public messages: CustomMessages = {}
}
