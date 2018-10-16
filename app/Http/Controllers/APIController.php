<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\User ;
use App\Book ;
use App\Role ;
use App\Chapter ;

class APIController extends Controller
{

    public function registerUser( $email, $name, $password ) {

    	header( "Access-Control-Allow-Origin: *" ) ;

        $user           =  User::create([
            'name'      => $name,
            'email'     => $email,
            'password'  => Hash::make( $password ),
        ]);

        $user->roles()->attach( Role::where( 'name', 'student' )->first() ) ;

        if ( $user ) {
        	return [ 'message' => 'success' ] ;
        } else {
        	return [ 'message' => 'failed' ] ;
        }

    }

    public function loginUser( $email, $password ) {
    	
    	header( "Access-Control-Allow-Origin: *" ) ;

		if ( Auth::attempt( ['email' => $email, 'password' => $password ] ) ) {
		    return User::whereEmail($email)->first() ;
		} else {
        	return [ 'message' => 'failed' ] ;
        }

    }

    public function searchBooks( $search_criteria ) {
    	
    	header( "Access-Control-Allow-Origin: *" ) ;

    	$count_results = Book::where('title', $search_criteria )
                   ->orWhere('description', 'like', '%' . $search_criteria . '%')
                   ->orWhere('author', 'like', '%' . $search_criteria . '%')->count() ;

        if ( $count_results > 0 ) {
	        return Book::where('title', $search_criteria )
	                   ->orWhere('description', 'like', '%' . $search_criteria . '%')
	                   ->orWhere('author', 'like', '%' . $search_criteria . '%')
	                   ->get();        	
	    } else {
	    	return [ 'message' => 'No data found' ] ;
	    }

    }

    public function getAllBooks() {
    	
    	header( "Access-Control-Allow-Origin: *" ) ;

	    return Book::all() ;

	}

    public function getChapterByBookId( $book_id ) {
    	
    	header( "Access-Control-Allow-Origin: *" ) ;

	    return Chapter::whereBookId( $book_id )->get() ;

	}

}
