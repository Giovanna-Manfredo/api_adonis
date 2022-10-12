import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reports'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .integer('user_id') // quem está seguindo
      .unsigned()
      .references('users.id')
      
      .onDelete('CASCADE')
      table
        .integer('post_id') // quem está sendo seguido
        .unsigned()
        .references('posts.id')
        
        .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
