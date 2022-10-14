import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class PreferenceValidator {
  constructor() {}

  public schema = schema.create({
    id: schema.number(),
  })

  
  public messages: CustomMessages = {}
}
