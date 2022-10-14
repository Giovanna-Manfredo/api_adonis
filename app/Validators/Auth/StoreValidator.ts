import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'


export default class AuthValidator {
  constructor() {}

  public schema = schema.create({
    email: schema.string({trim:true}, [rules.email(),]),
    password: schema.string({trim: true})
  })

  
  public messages: CustomMessages = {}
}
