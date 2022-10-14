
import { schema } from '@ioc:Adonis/Core/Validator'

export default class UpdateValidator {
  constructor() {}

  public schema = schema.create({
    file: schema.file({
      size: '5mb',
      extnames: ['jpg', 'png', 'jpeg']
    })
  })

  public messages = {}
}