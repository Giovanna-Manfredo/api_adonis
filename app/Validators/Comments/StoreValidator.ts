import { schema } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor() {}

  public schema = schema.create({
    content: schema.string.optional({ trim: true })
  })

  public messages = {}
}