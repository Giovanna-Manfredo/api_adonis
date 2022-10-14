import { schema } from '@ioc:Adonis/Core/Validator'

export default class StoreValidator {
  constructor() {}

  public schema = schema.create({
    file: schema.file({
      size: '500mb',
      extnames: ['jpg', 'png', 'jpeg', 'mp4', 'mov']
    })
  })

  public messages = {}
}