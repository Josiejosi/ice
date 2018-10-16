<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () { return redirect('/login') ; });

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/upload/book', 'BookController@upload_book');
Route::get('/books', 'BookController@index')->name('books');
Route::get('/text_to_speach', 'BookController@text_to_speach');
Route::get('/pay/{chapter}/{title}', 'BookController@pay');

Route::get('/payment/return', 'PaymentController@return') ;
Route::get('/payment/cancel', 'PaymentController@cancel') ;
Route::get('/payment/notify', 'PaymentController@notify') ;


Route::get('/api/v1/register/{email}/{name}/{password}', 'APIController@registerUser') ;
Route::get('/api/v1/login/{email}/{password}', 'APIController@loginUser') ;
Route::get('/api/v1/book/{search}', 'APIController@searchBooks') ;
Route::get('/api/v1/books', 'APIController@getAllBooks') ;
Route::get('/api/v1/chapters/{book_id}', 'APIController@getChapterByBookId') ;
