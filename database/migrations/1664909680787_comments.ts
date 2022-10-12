import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('content', 'longtext').notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .notNullable()
   
        .onDelete('CASCADE')
      table
        .integer('post_id')
        .unsigned()
        .references('posts.id')
        .notNullable()
      
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
