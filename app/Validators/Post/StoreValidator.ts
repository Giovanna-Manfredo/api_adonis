import { schema } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor() {}

  public schema = schema.create({
    title: schema.string(),
    description: schema.string.optional({ trim: true }),
    tag_id: schema.number()
  })

  public messages = {}
}