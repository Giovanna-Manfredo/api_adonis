import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'follows'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .integer('follower_id') // quem está seguindo
      .unsigned()
      .references('users.id')
  
      .onDelete('CASCADE')
      table
        .integer('following_id') // quem está sendo seguido
        .unsigned()
        .references('users.id')
        
        .onDelete('CASCADE')
      })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
