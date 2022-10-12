import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
      .integer('user_id') // quem está seguindo
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      table
      .integer('user_reference_id') // quem está seguindo
      .unsigned()
      .references('users.id')
      .onDelete('CASCADE')
      table.text('description', 'longtext')
      table.enu('notification_category', ['comments', 'like']).notNullable()
      table.timestamp('created_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
