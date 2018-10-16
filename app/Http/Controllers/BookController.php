<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Book ;
use App\Chapter ;
use App\TempPage ;

use GoogleSpeech\TextToSpeech ;

class BookController extends Controller
{

	public function index() {

		return view('books', ['books' => Book::where( 'status', 1 )->get()] ) ;

	}
	
	public function view_book($id) { 
		return view('books.view', ['book' => Book::find( $id ), 'pages'=> TempPage::take(30)->where( 'book_id', $id )->get()] ) ;
	}

	public function pending_books() { 
		return view('books.pending', ['books' => Book::where( 'status', 0 )->get()] ) ;
	}
	
	public function approve_book( Request $request, $id ) { 
		$book 											= Book::find( $id ) ;
		$book->status 									= true ;
		$book->save() ;

		$request->session()->flash( 'status', 'Book Approved, now ready to be purchased on apps.' ) ;

		return redirect()->back() ;

	}

	public function create_chapter( Request $request ) {
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
		$chapter_number 					= $request->chapter_number ;

		$number_of_pages 					= count($pages) ;

		$chapter_preview_content_count 		= 0 ;

		for ($i=1; $i < $number_of_pages; $i++) { 
			//TempPage

			$page_id 						= $pages[$i] ;

			$page 							= TempPage::find( $page_id ) ;

			$raw_css 						= $page->raw_css ;
			$raw_html 						= $page->raw_html ;

			$new_chapter 					.= $raw_css .  $raw_html ;

			if ( $chapter_preview_content_count < 3 ) {
				$chapter_preview_content 	.= $raw_css .  $raw_html ;
				$chapter_preview_content_count++ ;
			}

			$page->delete() ;

		}

		$new_chapter . "</body></html>" ;

		$chapter_preview_content . "</body></html>" ;

		$new_generated_path 				= public_path() . '/uploads/books/publisher_id_'.auth()->user()->id ;

		$file_content_tags 					= strip_tags( $new_chapter ) ;

		$speech = new TextToSpeech() ;
		$speech->withLanguage('en-us')->inPath( $new_generated_path . '/audio/') ;

		$audio_path = "" ;

		$download_tts = trim(preg_replace("/[^a-zA-Z0-9\s]/", "", $file_content_tags)) ;
		$speech->withName( "chapter_" . $chapter_number ) ;
		$speech->download( substr( $download_tts, 0, 200 ) ) ;
										    
		$audio_path = $speech->getCompletePath() ;


		$chapter 							= new Chapter ;
		$chapter->name 						= $chapter_number ;
		$chapter->file_name 				= $audio_path ;
		$chapter->raw_content 				= $new_chapter ;
		$chapter->text_content 				= $file_content_tags ;
		$chapter->chapter_preview_content 	= $chapter_preview_content ;
		$chapter->book_id 					= $book_id ;
		$chapter->audio_url 				= $audio_path ;
		$chapter->chapter_number			= $chapter_number ;
		$chapter->save() ;

		$request->session()->flash( 'status', 'Successfully created Chapter: \''.$chapter_number ) ;

		return redirect()->back() ;
	}

	public function text_to_speach() {

/*		$speech = new TextToSpeech();
		$speech->withLanguage('en-us')->inPath('../audios') ;

		for($i=0;$i<10;$i++){
		    $speech->withName('output' . $i);
		    $speech->download('I would try something like that ' . $i);
		    
		    echo 'File generated:' . $speech->getCompletePath() . '<br>';
		}*/
	
	}

    public function upload_book( Request $request ) {

	    $validatedData 										= $request->validate([
	        'book' 											=> 'required|mimes:epub,pdf',
	        'book_title' 									=> 'required',
	        'book_desc' 									=> 'required',
	        'book_imei_number' 								=> 'required',
	        'book_author' 									=> 'required',
	        'author_review' 								=> 'required',
	    ]);


    	$book_title 										= $request->input('book_title') ;
    	$book_desc 											= $request->input('book_desc') ;
    	$book_imei_number 									= $request->input('book_imei_number') ;
    	$book_author 										= $request->input('book_author') ;
    	$author_review 										= $request->input('author_review') ;

    	$path_to_store 										= 'books/publisher_id_'.auth()->user()->id.'/'.$book_title ;
    	$path_to_store_chapters 							= 'books/publisher_id_'.auth()->user()->id.'/'.$book_title.'/chapters' ;

    	$new_generated_path 								= public_path() . '/uploads/books/publisher_id_'.auth()->user()->id.'/'.$book_title ;

    	$cover_url 											= "" ;
    	$cover_content 										= "" ;

		if ( $request->hasFile( 'book_cover' ) ) {
		    
		    $path 											= $request->book_cover->path();
			$extension 										= $request->book_cover->extension();

			//$cover_url 										= $request->book_cover->store( $path_to_store ) ;
			$cover_url 										= $request->book_cover->storeAs( $path_to_store, $request->book_cover->getClientOriginalName(), 'public_uploads');

		}

		$oebps_dir 											= public_path() . '/uploads/' . $path_to_store_chapters . "/OEBPS" ;

		if ( $request->hasFile( 'book' ) ) {

		    $path 											= $request->book->path() ;
			$extension 										= $request->book->extension() ;
			
			$book 											= new Book ;

			$book->title 									= $book_title ;
			$book->description 								= $book_desc ;
			$book->author 									= $book_author ;
			$book->imei_number 								= $book_imei_number ;
			$book->author_review 							= $author_review ;
			$book->cover_url 								= $cover_url ;
			$book->book_url 								= $cover_content ;//status
			$book->status 									= false ;
			$book->user_id 									= auth()->user()->id ;
			$book->save() ;

			//working with epub.
			//

			if ( $extension === "epub" ) {

				$cover_content 									= $request->book->storeAs( $path_to_store, $book_title . '.zip', 'public_uploads' ) ;

				$zip 											= new \ZipArchive;
				$res 											= $zip->open( public_path() . '/uploads/' . $cover_content ) ;
				
				if ( $res ) {

					$zip->extractTo( public_path() . '/uploads/' .$path_to_store_chapters ) ;
					$zip->close() ;

					

					if ( file_exists ( $oebps_dir ) ) {

						if ( $handle = opendir( $oebps_dir ) ) {
							
							$chapter_number  = 1 ;

						    while ( false !== ( $original_file = readdir( $handle ) ) ) {

						        if ( $original_file != "." && $original_file != ".." ) {

						        	if ( substr( strtolower( $original_file ) , -5 ) == ".html" ) {
						        		
						        		$raw_file_content 		= file_get_contents( $oebps_dir . "/" . $original_file  ) ;

						        		$file_content_tags 		= strip_tags( $raw_file_content ) ;

						        		$raw_content_length 	= strlen( $raw_file_content ) ;

						        		$percent_of_content 	= ( $raw_content_length * 10 ) / 100 ;

						        		$doc = new \DOMDocument() ;
										@$doc->loadHTML( substr( $raw_file_content, 0, $percent_of_content ) ) ;
						        		$chapter_preview_content = $doc->saveHTML() ;

										

										$speech = new TextToSpeech() ;
										$speech->withLanguage('en-us')->inPath( $new_generated_path . '/audio/') ;

										$audio_path = "" ;

										if ( strpos( strtolower( $original_file ), "ch" ) ) {
											$download_tts = trim(preg_replace("/[^a-zA-Z0-9\s]/", "", $file_content_tags)) ;
										    $speech->withName( substr( strtolower( $original_file ), 0, -5 ) ) ;

										    $speech->download( substr( $download_tts, 0, 200 ) ) ;
										    
										    $audio_path = $speech->getCompletePath() ;

							        		$chapter 				= new Chapter ;
											$chapter->name 			= $original_file ;
											$chapter->file_name 	= asset( '/uploads/' .$path_to_store_chapters . $original_file ) ;
											$chapter->raw_content 	= $raw_file_content ;
											$chapter->text_content 	= $file_content_tags ;
											$chapter->chapter_preview_content 	= $chapter_preview_content ;
											$chapter->book_id 		= $book->id ;
											$chapter->audio_url 	= $audio_path ;
											$chapter->chapter_number= $chapter_number ;
											$chapter->save() ;
										    
										    $chapter_number++ ;
										}
										
										$request->session()->flash('status', 'Successfully added a new EPUB book: \''.$book_title.'\'!') ;

						        	}
						            
						        }
						    }

						    closedir($handle);
						}

					} else {
						$request->session()->flash( 'status', 'EPUB not in a the right format.' ) ;
					}


				}

			} else {
				$source = new \Gufy\PdfToHtml\Base ;
				
				$pdf_storage_directory = public_path() . '/uploads/temp_pages/' . $book_title . "/PDF/" ;

		        if ( !file_exists( $pdf_storage_directory ) )
		            mkdir( $pdf_storage_directory, 0777, true ) ;

				$source->open($path) ;
				$source->setOutputDirectory( $pdf_storage_directory ) ;
				$source->generate() ;
				

				$generated_file = $this->findGeneratedHTMLFile( $pdf_storage_directory ) ;

				if ( $generated_file !== false ) {
					//operate on the content of the document.
					//
					$file_content = file_get_contents( $generated_file ) ;
					
					$is_images_loaded = $this->findImageTagsAndReplaceWithBase64( $file_content, $pdf_storage_directory, $generated_file ) ;
					
					if ( $is_images_loaded ) {
						$image_updated_content = file_get_contents( $pdf_storage_directory . "/index.html" ) ;
						$number_of_pdf_pages = $this->getNumberOfPages( $image_updated_content ) ;

						$pages = $this->getIndividualPages( $image_updated_content, $number_of_pdf_pages ) ;
						$styles = $this->getIndividualPageStyles( $image_updated_content, $number_of_pdf_pages ) ;
						
						for ($i=0; $i < $number_of_pdf_pages; $i++) { 

							$temp_page 						= new TempPage ;
							$temp_page->raw_html 			= $pages[$i] ;
							$temp_page->raw_css 			= $styles[$i] ;
							$temp_page->book_id 			= $book->id ;
							$temp_page->save() ;

						}
						
						$request->session()->flash( 'status', 'Successfully added a new PDF book: \''.$book_title.'\', approval needed by admin' ) ;

					}

				} else {
					//
				}
				
			}		

		}

		return redirect()->back() ;

    }

    private function getChapters( $content ) {

    }

    private function getNumberOfPages( $content ) {
    	$dom = new \DOMDocument() ;
		$dom->loadHTML( $content ) ;

		$page_number = 1 ;

		$number_of_pages = 0 ;

		foreach ( $dom->getElementsByTagName( 'div' ) as $div ) {

			if ( $div->getAttribute( "id" ) == "page" . $page_number . "-div" ) {
				$number_of_pages++ ;
			}

			$page_number++ ;

		}

		return $number_of_pages ;
    }

    private function getIndividualPages( $content, $number_of_pages ) {
    	$pages = [] ;

    	$dom = new \DOMDocument() ;
		$dom->loadHTML( $content ) ;

		$page_number = 1 ;

		foreach ( $dom->getElementsByTagName( 'div' ) as $div ) {

			if ( $div->getAttribute( "id" ) == "page" . $page_number . "-div" ) {

				$page = '<div id="page' . $page_number.'-div" style="position:relative;width:918px;height:1188px;">' . $this->DOMinnerHTML($div) .  '</div>' ;
				array_push( $pages, $page ) ;

			}
			$page_number++ ;

		}

		return $pages ;

    }

    private function getIndividualPageStyles( $content, $number_of_pages ) {
    	$styles = [] ;

    	$dom = new \DOMDocument() ;
		$dom->loadHTML( $content ) ;

		$style_number = 1 ;

		foreach ( $dom->getElementsByTagName( 'style' ) as $style ) {
			$new_style = '<style type="text/css">' . $this->DOMinnerHTML( $style ) . '</style>' ;
			array_push( $styles, $new_style ) ;

		}

		return $styles ;
    }

	private function DOMinnerHTML($element) { 
	    $innerHTML = ""; 
	    $children  = $element->childNodes;

	    foreach ($children as $child) 
	    { 
	        $innerHTML .= $element->ownerDocument->saveHTML($child);
	    }

	    return $innerHTML; 
	}



    private function findImageTagsAndReplaceWithBase64( $content, $path, $original_file ) {

    	$dom = new \DOMDocument() ;
		$dom->loadHTML( $content ) ;

		foreach ( $dom->getElementsByTagName('img') as $img ) {
			// put your replacement code here
			$base64Image = $this->imageToBase64( $path . "/" . $img->getAttribute( "src" ) ) ; 

			$img->setAttribute( 'src', $base64Image ) ;
		}

		$content = $dom->saveHTML() ;

		file_put_contents( $path . "/index.html", $content ) ; 

		unlink( $original_file ) ;

		$this->removeAllPngImages( $path ) ;

		return true ;
    }

    private function removeAllPngImages($path) {

		$files = glob( $path. '/*.png' ) ; //get all file names
		foreach( $files as $file ) {
		    if( is_file( $file ) )
		    	unlink( $file ) ; //delete file
		}

    }

    private function findGeneratedHTMLFile( $path ) {
    	
		$contents = glob( $path . "*.html" ) ;

		// check if $contents is a directory and actually has items
		if (is_array( $contents ) && count( $contents ) ) {
			// loop through directory contents
			foreach( $contents as $item ) { 
				
				// checking if a file ends with .html
				if ( substr( strtolower($item), -5) == ".html" && substr( strtolower($item), -10) !== "index.html"  ) { 

					return $item ;

				}
			}
		}  else {
			return false ;
		}  	
    }

    private function imageToBase64( $image ) {
		$type = pathinfo( $image, PATHINFO_EXTENSION ) ;
		$data = file_get_contents( $image ) ;
		return 'data:image/' . $type . ';base64,' . base64_encode( $data ) ;
    }

}
