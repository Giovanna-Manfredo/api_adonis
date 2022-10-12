import Route from '@ioc:Adonis/Core/Route' 

Route.post('/user', 'User/Main.store')
Route.post('/user/preference', 'Preference/Main.store')

Route.post('/user/search', 'Search/Main.index').middleware('auth')
Route.get('/user/notification', 'Notification/Main.index').middleware('auth')

Route.get('/user/require', 'User/Main.show').middleware('auth')
Route.put('/user/update', 'User/Main.update').middleware('auth')


Route.put('/user/avatar', 'User/Avatar.update').middleware('auth')
Route.delete('/user/avatar', 'User/Avatar.destroy').middleware('auth')

