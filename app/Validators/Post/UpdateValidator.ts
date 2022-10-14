import { schema } from '@ioc:Adonis/Core/Validator'

export default class UpdateValidator {
  constructor() {}

  public schema = schema.create({
    description: schema.string.optional({ trim: true })
  })

  public messages = {}
}