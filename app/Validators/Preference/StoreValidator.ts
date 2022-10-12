import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number(),
    preference_ids: schema.array([rules.minLength(1)]).members(schema.number())
  })

  public messages: CustomMessages = {}
}
