import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'


export default class StoreValidator {
  constructor() {}

  public schema = schema.create({
    preference_ids: schema.array([rules.minLength(1)]).members(schema.number())
  })

  public messages: CustomMessages = {}
}
