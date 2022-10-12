import Route from '@ioc:Adonis/Core/Route' 

Route.post('/user/login', 'Auth/Main.store')
Route.delete('/user/logout', 'Auth/Main.destroy').middleware('auth')

