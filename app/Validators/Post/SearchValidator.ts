import { schema } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor() {}

  public schema = schema.create({
    term: schema.string(),
  })

  public messages = {}
}