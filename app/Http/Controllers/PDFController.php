<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Book ;
use App\Chapter ;
use App\TempPage ;

use GoogleSpeech\TextToSpeech ;

class PDFController extends Controller
{
    public function pdf_split($id) {

    	return view('books.pdf_split', [
    		'book' 			=> Book::find( $id ), 
    		'pages' 		=> TempPage::where( 'book_id', $id )->get(),
    		'chapters' 		=> Chapter::where( 'book_id', $id )->get()
    	] ) ;
    } 

    public function create_chapter(Request $request) {


		$new_chapter = '<!DOCTYPE html>
		<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
		<head>
		    <title>Chapter</title>
		    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		    <meta name="author" content="Tebogo Sewape">
		    <style type="text/css">
		    .xflip {
		    -moz-transform: scaleX(-1);
		    -webkit-transform: scaleX(-1);
		    -o-transform: scaleX(-1);
		    transform: scaleX(-1);
		    filter: fliph;
		    }
		    .yflip {
		    -moz-transform: scaleY(-1);
		    -webkit-transform: scaleY(-1);
		    -o-transform: scaleY(-1);
		    transform: scaleY(-1);
		    filter: flipv;
		    }
		    .xyflip {
		    -moz-transform: scaleX(-1) scaleY(-1);
		    -webkit-transform: scaleX(-1) scaleY(-1);
		    -o-transform: scaleX(-1) scaleY(-1);
		    transform: scaleX(-1) scaleY(-1);
		    filter: fliph + flipv;
		    }
		    body { width: 918px; margin: 5px auto; }
		    </style>
		</head>
		<body bgcolor="#A0A0A0" vlink="blue" link="blue">' ;

		$chapter_preview_content = '<!DOCTYPE html>
		<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
		<head>
		    <title>Chapter</title>
		    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		    <meta name="author" content="Tebogo Sewape">
		    <style type="text/css">
		    .xflip {
		    -moz-transform: scaleX(-1);
		    -webkit-transform: scaleX(-1);
		    -o-transform: scaleX(-1);
		    transform: scaleX(-1);
		    filter: fliph;
		    }
		    .yflip {
		    -moz-transform: scaleY(-1);
		    -webkit-transform: scaleY(-1);
		    -o-transform: scaleY(-1);
		    transform: scaleY(-1);
		    filter: flipv;
		    }
		    .xyflip {
		    -moz-transform: scaleX(-1) scaleY(-1);
		    -webkit-transform: scaleX(-1) scaleY(-1);
		    -o-transform: scaleX(-1) scaleY(-1);
		    transform: scaleX(-1) scaleY(-1);
		    filter: fliph + flipv;
		    }
		    body { width: 918px; margin: 5px auto; }
		    </style>
		</head>
		<body bgcolor="#A0A0A0" vlink="blue" link="blue">' ;

		$pages 								= $request->page ;
		$book_id 							= $request->book_id ;
		$chapter_name 						= $request->chapter_name ;
		$chapter_number 					= $request->chapter_number ;
		$start_page 						= $request->start_page ;
		$end_page 							= $request->end_page ;

		$book 								= Book::find( $book_id ) ;

		$number_of_pages 					= $end_page - $start_page ;

		$chapter_preview_content_count 		= 0 ;

		for ( $i=0; $i<$number_of_pages; $i++ ) { 
			//TempPage

			$page 							= TempPage::find( $start_page ) ;

			$raw_css 						= $page->raw_css ;
			$raw_html 						= $page->raw_html ;

			$new_chapter 					.= $raw_css .  $raw_html ;

			if ( $chapter_preview_content_count < 3 ) {
				$chapter_preview_content 	.= $raw_css .  $raw_html ;
				$chapter_preview_content_count++ ;
			}

			$page->delete() ;

			$start_page++ ;

		}

		$new_chapter .= "</body></html>" ;

		$chapter_preview_content .= "</body></html>" ;//public_path()

		$org_url 							= url( '/' ) . '/uploads/books/publisher_id_'.auth()->user()->id . '/'. $book->title . '/audio/chapter_' . $chapter_number . '.mp3' ;

		$new_generated_path 				=  public_path() . '/uploads/books/publisher_id_'.auth()->user()->id . '/'. $book->title ;

		if ( !file_exists( $new_generated_path ) )
		    mkdir( $new_generated_path, 0777, true ) ;

		$file_content_tags 					= strip_tags( $new_chapter ) ;

		$speech = new TextToSpeech() ;
		$speech->withLanguage('en-us')->inPath( $new_generated_path . '/audio/') ;

		$audio_path = "" ;

		$download_tts = trim(preg_replace("/[^a-zA-Z0-9\s]/", "", $file_content_tags)) ;
		$speech->withName( "chapter_" . $chapter_number ) ;
		$speech->download( substr( $download_tts, 0, 200 ) ) ;
										    
		$audio_path = $speech->getCompletePath() ;


		$chapter 							= new Chapter ;
		$chapter->name 						= $chapter_name ;
		$chapter->file_name 				= $audio_path ;
		$chapter->raw_content 				= $new_chapter ;
		$chapter->text_content 				= $file_content_tags ;
		$chapter->chapter_preview_content 	= $chapter_preview_content ;
		$chapter->book_id 					= $book_id ;
		$chapter->audio_url 				= $org_url ;
		$chapter->chapter_number			= $chapter_number ;
		$chapter->number_of_pages			= $number_of_pages ;
		$chapter->save() ;

		$request->session()->flash( 'status', 'Successfully created Chapter: \''. $chapter_name ) ;

		return redirect()->back() ;
    }
}
