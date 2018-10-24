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

Route::get('/pending_books', 'BookController@pending_books')->name('pending_books');
Route::get('/view_book/{id}', 'BookController@view_book');
Route::get('/approve_book/{id}', 'BookController@approve_book');

Route::post('/create/chapter/{id}', 'BookController@create_chapter');

Route::get('/text_to_speach', 'BookController@text_to_speach');

Route::get('/pay/{chapter}/{title}', 'PaymentController@pay');

Route::get('/pdf/split/{id}', 'PDFController@pdf_split') ;//create_chapter
Route::post('/pdf/chapter/create', 'PDFController@create_chapter') ;

Route::get('/epub/approve/{id}', 'EPUBController@epub_approve') ;

Route::get('/payment/return', 'PaymentController@return') ;
Route::get('/payment/cancel', 'PaymentController@cancel') ;
Route::get('/payment/notify', 'PaymentController@notify') ;


Route::get('/api/v1/register/{email}/{name}/{password}', 'APIController@registerUser') ;
Route::get('/api/v1/login/{email}/{password}', 'APIController@loginUser') ;
Route::get('/api/v1/book/{search}', 'APIController@searchBooks') ;
Route::get('/api/v1/books', 'APIController@getAllBooks') ;
Route::get('/api/v1/chapters/{book_id}/{user_id}', 'APIController@getChapterByBookId') ;
Route::get('/api/v1/purchase/chapters/{book_id}/{chapter_id}/{user_id}', 'APIController@chapterPurchase') ; //userIDByEmail( $email )
Route::get('/api/v1/user/id/{email}', 'APIController@userIDByEmail') ;

Route::get('/api/v1/fullchapter/{chapter_id}', 'APIController@getFullChapterById') ;
Route::get('/api/v1/previewchapter/{chapter_id}', 'APIController@getPreviewChapterById') ;
