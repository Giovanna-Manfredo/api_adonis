import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string(),
    description: schema.string.optional({ trim: true }),
    tag_id: schema.number()
  })

  public messages = {}
}