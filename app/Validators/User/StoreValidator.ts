import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'


export default class RegisterValidator {
  constructor() {}

  public schema = schema.create({
    name: schema.string({trim:true}),
    username: schema.string({trim:true}, [rules.unique({table: 'users', column: 'username'})]),
    email: schema.string({trim:true}, [rules.email(), rules.unique({table: 'users', column: 'email'})]),
    password: schema.string({trim: true}),
  })

  
  public messages: CustomMessages = {}
}
