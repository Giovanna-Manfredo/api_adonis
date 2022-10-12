import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'saveds'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('saved').defaultTo(true)
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
      
        .onDelete('CASCADE')
      table
        .integer('post_id')
        .unsigned()
        .references('posts.id')
      
        .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
