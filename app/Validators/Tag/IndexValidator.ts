import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IndexValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    forum_id: schema.number.optional()
  })

  
  public messages: CustomMessages = {}
}
