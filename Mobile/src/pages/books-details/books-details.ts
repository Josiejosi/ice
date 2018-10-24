import { Component } from '@angular/core';
import { NavController, NavParams,ToastController, LoadingController, PopoverController, ModalController } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { ChaptersPage } from '../chapters/chapters';

import { PreviewPage } from '../preview/preview';
import { ListenPage } from '../listen/listen';

import { FullChapterPage } from '../full-chapter/full-chapter';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Storage } from '@ionic/storage';

import { GlobalsProvider } from '../../providers/globals/globals' ;

@Component({
	selector: 'page-books-details',
	templateUrl: 'books-details.html',
})
export class BooksDetailsPage { //api/v1/purchase/chapters/{book_id}/{chapter_id}/{user_id}

	selected_book: any = [] ;
	chapters: any = [] ;

	assets_directory: string = "http://169.60.182.182/uploads/" ;
	chapter_url: string = "http://169.60.182.182/api/v1/chapters/" ;

	url: string ;

	api_url: string ;

	user_id: string ;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public inappbrowser: InAppBrowser,
		public modalCtrl : ModalController,
		public storage: Storage,
		public http: Http,
		public global: GlobalsProvider
		) {

		this.url = global.app_url ;

		this.api_url = global.api_url ;
	}

    EventExists( events, event_id ) {
        return events.some( function(el) { return el.event_id === event_id ; } );
    }

	viewChapters(book_id) {

		this.navCtrl.push( ChaptersPage, {  book: book_id } ) ;

	}

	public openModal(){

	}

	//chapter.chapter_preview_content, selected_book.title,chapter.name
	preview( chapter, selected_book) { //content, book_title, file_name 

		let bookmark = {
			title: selected_book.title, 
			number_of_pages: chapter.number_of_pages, 
		} ;

        this.storage.set( 'bookmark', bookmark ).then( () => {

			this.navCtrl.push( PreviewPage, {  
				book: chapter.chapter_preview_content, 
				title: selected_book.title, 
				sound: chapter.audio_url  
			}) ;

        }) ;
		
	}

	download( chapter, selected_book ) {

	  	let browser = this.inappbrowser.create( this.url + "pay/"+chapter.name+"/"+selected_book.title, '_blank', 'location=no') ;

	  	let purchase_chapter = this.api_url + "purchase/chapters/"+selected_book.id+"/"+chapter.id+"/"+ this.user_id ;

	   	browser.show();

	   	browser.on("loadstart").subscribe( event => {
	        
	        if ( event.url.indexOf("some error url") > -1 ) {

	         	browser.close();
		        this.navCtrl.setRoot( BooksDetailsPage, { success:false } );

	        }

	    }, err => { 

	    	console.log("InAppBrowser loadstart Event Error: " + err) ; 

	    });
	   
	    browser.on("loadstop").subscribe(  event => {
	       	
	        if ( event.url == this.url + "/payment/return" ) {

	        	console.log( "Payment was successful." ) ; 

	        	this.purchasedChapter( purchase_chapter ) ;
	        	
	         	setInterval( function() {

	         		let purchased_books: any = [] ;

			        this.storage.ready().then( () => {   

			           	this.storage.get( 'books' ).then( ( books ) => {

			                if ( books != null ) {

			                    for( let i = 0; i < books.length; i++ ) {

			                        if ( books[i].book_id != selected_book.id && books[i].chapter_id != chapter.id ) {

			                            purchased_books.push( {
			                                book_id: books[i].book_id, 
			                                book_cover: books[i].book_cover, 
			                                chapter_id: books[i].chapter_id, 
			                                chapter_content: books[i].chapter_content
			                            }) ;

			                        }
			                    }  
			                }

			            });
			        }); 

			        purchased_books.push({

	         			book_id: selected_book.id,
	         			book_cover: selected_book.cover_url,
	         			chapter_id: chapter.id,
	         			chapter_content: chapter.raw_content,

			        }) ;

			        this.storage.ready().then( () => {

		         		this.storage.set( 'books', purchased_books ).then( () => {

		         			browser.close() ; 

		         		}) ;

	         		});


	         	}, 3000 ) ;
	        }

	        if ( event.url == this.url + "/payment/cancel" ) {

	        	setInterval( function() {

	        		browser.close() ; 

	        	}, 3000 ) ;
	        	
	         	

	        }

	        if ( event.url == this.url + "/payment/notify" ) {

	        	console.log( "notify" ) ;
	         	browser.close() ;

	        }

	    }, err => { 

	    	console.log( "InAppBrowser loadstop Event Error: " + err ) ; 

	    });


	}

	loadAllChapters( book_id ) {

		console.log( "Loading chapters: " + this.chapter_url + book_id + "/" + this.global.user_id ) ; 

		const loader = this.loadingCtrl.create({content: "Loading chapter..."}) ;
		loader.present();

		this.http.get( this.chapter_url + book_id + "/" + this.global.user_id ).map( res => res.json() ).subscribe( data => { 

			this.chapters = data ;
			this.chapters.sort() ;

			console.log( data ) ; 

		    loader.dismiss() ;

		});

	}


	purchasedChapter( url ) {

		console.log( "Purchasing chapter...." ) ;

		this.http.get( url ).map( res => res.json() ).subscribe( data => { 

			console.log( "Chapter purchased." ) ;

			this.loadAllChapters( this.selected_book.id ) ;

		});

	}

	ionViewDidLoad() {


		this.selected_book = this.navParams.get( 'selected_book' ) ;

		this.loadAllChapters( this.selected_book.id ) ;

	}

}
