<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Book ;
use App\Chapter ;

use GoogleSpeech\TextToSpeech ;

class BookController extends Controller
{

	public function index() {

		return view('books', ['books' => Book::all()] ) ;

	}

	public function pay( $chapter, $title) {

		$data = [
		    // Merchant details
		    'merchant_id' => '12966341',
		    'merchant_key' => '5018xj78swngr',
		    'return_url' => url('/') . '/payment/return',
		    'cancel_url' => url('/') . '/payment/cancel',
		    'notify_url' => url('/') . '/payment/notify',
		    // Buyer details
		    'name_first' => 'Tebogo',
		    'name_last'  => 'Sewape',
		    'email_address'=> 'sewapetj@gmail.com',
		    // Transaction details
		    'm_payment_id' => rand( 1111111111,999999999 ), //Unique payment ID to pass through to notify_url
		    // Amount needs to be in ZAR
		    // If multicurrency system its conversion has to be done before building this array
		    'amount' => number_format( sprintf( "%.2f", 5 ), 2, '.', '' ),
		    'item_name' => $chapter . " - " . $title,
		    'item_description' => $title,
		    'custom_int1' => rand( 1111111111,999999999 ), //custom integer to be passed through           
		    'custom_str1' => $chapter . " - " . $title
		] ;   

		$pfOutput  = "" ;     

		// Create GET string
		foreach( $data as $key => $val )
		{
		    if(!empty($val))
		     {
		        $pfOutput .= $key .'='. urlencode( trim( $val ) ) .'&';
		     }
		}
		// Remove last ampersand
		$getString = substr( $pfOutput, 0, -1 );
		if( isset( $passPhrase ) )
		{
		    $getString .= '&passphrase='. urlencode( trim( $passPhrase ) ) ;
		}   
		$data['signature'] = md5( $getString ) ;

		$url = "https://www.payfast.co.za/eng/process/?" . $getString ;

		return redirect( $url ) ;

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

		    $path 											= $request->book->path();
			$extension 										= $request->book->extension();

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

							$book 								= new Book ;

							$book->title 						= $book_title ;
							$book->description 					= $book_desc ;
							$book->author 						= $book_author ;
							$book->imei_number 					= $book_imei_number ;
							$book->author_review 				= $author_review ;
							$book->cover_url 					= $cover_url ;
							$book->book_url 					= $cover_content ;
							$book->user_id 						= auth()->user()->id ;
							$book->save() ;

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

										$request->session()->flash('status', 'Successfully added a new book: \''.$book_title.'\'!') ;

										$speech = new TextToSpeech() ;
										$speech->withLanguage('en-us')->inPath( $new_generated_path . '/audio/') ;

										$audio_path = "" ;

										if ( strpos( strtolower( $original_file ), "ch" ) ) {
											$download_tts = trim(preg_replace("/[^a-zA-Z0-9\s]/", "", $file_content_tags)) ;
										    $speech->withName( substr( strtolower( $original_file ), 0, -5 ) ) ;

										    $speech->download( substr( $download_tts, 0, 200 ) ) ;
										    
										    $audio_path = $speech->getCompletePath() ;
										}

						        		$chapter 				= new Chapter ;
										$chapter->name 			= $original_file ;
										$chapter->file_name 	= asset( '/uploads/' .$path_to_store_chapters . $original_file ) ;
										$chapter->raw_content 	= $raw_file_content ;
										$chapter->text_content 	= $file_content_tags ;
										$chapter->chapter_preview_content 	= $chapter_preview_content ;
										$chapter->book_id 		= $book->id ;
										$chapter->audio_url 	= $audio_path ;
										$chapter->save() ;

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
				
				$pdf_storage_directory = public_path() . '/' . $book_title . "/PDF/" ;

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

						dump( $number_of_pdf_pages ) ;

						$pages = $this->getIndividualPages( $image_updated_content, $number_of_pdf_pages ) ;
						$styles = $this->getIndividualPageStyles( $image_updated_content, $number_of_pdf_pages ) ;

						dump( $pages ) ;
						dump( $styles ) ;
					}

				} else {
					//
				}
				
				die("PDF - EPUB.") ;
				
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

				$page = 'div id="page' . $page_number.'-div" style="position:relative;width:918px;height:1188px;">' . $this->DOMinnerHTML($div) .  '</div' ;
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
