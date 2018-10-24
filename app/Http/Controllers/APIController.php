<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\User ;
use App\Book ;
use App\Role ;
use App\Chapter ;
use App\PurchaseChapter ;

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

	    return Book::where( 'status', 1 )->get() ;

	}

    public function getChapterByBookId( $book_id, $user_id ) {
    	
    	header( "Access-Control-Allow-Origin: *" ) ;

	    $chapters = Chapter::whereBookId( $book_id )->get() ;

        $purchased_chapters = PurchaseChapter::whereBookId( $book_id )->whereUserId( $user_id )->get() ;

        $new_chapters = [] ;

        foreach ( $chapters as $chapter ) {

            $is_purchased = false ;

            foreach ( $purchased_chapters as $purchased ) {

                if ( $chapter->id == $purchased->chapter_id ) {

                    $is_purchased = true ;

                    break ;
                }

            }

            $new_chapters[]                 = [

                'id'                        => $chapter->id,
                'name'                      => $chapter->name,
                'file_name'                 => $chapter->file_name,
                'chapter_number'            => $chapter->chapter_number,
                'number_of_pages'           => $chapter->number_of_pages,
                'book_id'                   => $chapter->book_id,
                'is_purchased'              => $is_purchased,

            ] ;

        }

        return $new_chapters ;

	}

    public function userIDByEmail( $email ) {

        header( "Access-Control-Allow-Origin: *" ) ;

        if ( User::whereEmail( $email )->count() > 0 ) {

            $user = User::whereEmail( $email )->first() ;

            return [ 'user' => $user->id ] ;

        }

        return [ 'message' => 'failed' ] ;

    }

    public function chapterPurchase( $book_id, $chapter_id, $user_id ) {

        header( "Access-Control-Allow-Origin: *" ) ;

        $chapter_price = env( 'CHAPTER_PRICE' ) ;

        $chapter_purchase = new PurchaseChapter ;

        $chapter_purchase->book_id = $book_id ; 
        $chapter_purchase->chapter_id = $chapter_id ; 
        $chapter_purchase->user_id = $user_id ;
        $chapter_purchase->amount = $chapter_price ;
        $chapter_purchase->is_purchased = true ;

        $chapter_purchase->save() ;

        return [ 'message' => 'success' ] ;

    }

}
