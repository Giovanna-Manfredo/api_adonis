import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('username').unique().notNullable()
      table.enu('type', ['admin', 'normal']).defaultTo('normal')
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
