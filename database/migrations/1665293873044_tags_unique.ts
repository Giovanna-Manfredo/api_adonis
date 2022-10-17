import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public up() {
    this.schema.alterTable('tags', (table) => {
      table.string('name').notNullable()
    })
  }
}
