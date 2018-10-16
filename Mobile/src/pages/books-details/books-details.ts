import { Component } from '@angular/core';
import { NavController, NavParams,ToastController, LoadingController, PopoverController } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { ChaptersPage } from '../chapters/chapters';

import { PreviewPage } from '../preview/preview';
import { ListenPage } from '../listen/listen';

import { FullChapterPage } from '../full-chapter/full-chapter';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
	selector: 'page-books-details',
	templateUrl: 'books-details.html',
})
export class BooksDetailsPage {

	selected_book: any = [] ;
	chapters: any = [] ;

	assets_directory: string = "http://169.60.182.182/uploads/" ;
	chapter_url: string = "http://169.60.182.182/api/v1/chapters/" ;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public inappbrowser: InAppBrowser,
		public http: Http
		) {
	}

	viewChapters(book_id) {
		this.navCtrl.push( ChaptersPage, {  book: book_id } ) ;
	}

	preview( content, book_title, file_name ) {
		
		console.log("preview") ;
		console.log("content") ;
		console.log(content) ;
		console.log("title") ;
		console.log(book_title) ;
		console.log("sound") ;
		console.log(file_name) ;
		this.navCtrl.push( PreviewPage, {  book: content, title: book_title, sound: file_name  } ) ;

	}

	download( chapter, title ) {

/*		let options = {
	        merchant_id: '12966341',
	        merchant_key: '5018xj78swngr',
	        return_url: "http://app.ellumin.test/payment/return",
	        cancel_url: "http://app.ellumin.test/payment/cancel",
	        notify_url: "http://app.ellumin.test/payment/notify",
	        m_payment_id: Math.random() + 9999,
	        amount: 25.00,
	        item_name: chapter,
	        item_description: "Chapter from " + title,
	    };

		let formHtml:string = '';
		for(let key in options){
		   if (options.hasOwnProperty(key)) {
		       let value = options[key];
		      formHtml+='<input type="hidden" value="'+value+'" id="'+key+'" name="'+key+'"/>';
		   }
		}

		let url = "https://sandbox.payfast.co.za/eng/process"
		let payScript = "var form = document.getElementById('ts-app-payment-form-redirect'); ";
		payScript += "form.innerHTML = '" + formHtml + "';";
		payScript += "form.action = '" + url + "';";
		payScript += "form.method = 'POST';" ;
		payScript += "form.submit();" ;*/

//if (this.platform.is('cordova')) {
	  	let browser = this.inappbrowser.create( "http://169.60.182.182/pay/"+chapter+"/"+title, '_blank', 'location=no') ;
	   	browser.show();
	   	browser.on("loadstart").subscribe( event => {
	        console.log("loadstop -->",event);
	        if ( event.url.indexOf("some error url") > -1 ) {
	         	browser.close();
		        this.navCtrl.setRoot( BooksDetailsPage, { success:false } );
	        }
	    }, err => { console.log("InAppBrowser loadstart Event Error: " + err) ; });
	   //on url load stop
	    browser.on("loadstop").subscribe(  event => {
	        //browser.executeScript({ code:payScript });
	       	console.log("loadstart -->",event);
	        if ( event.url == "http://169.60.182.182/payment/return" ) {
	        	console.log( "return" ) ;
	         	browser.close() ;
	        }
	        if ( event.url == "http://169.60.182.182/payment/cancel" ) {
	        	console.log( "cancel" ) ;
	         	browser.close() ;
	        }
	        if ( event.url == "http://169.60.182.182/payment/notify" ) {
	        	console.log( "notify" ) ;
	         	browser.close() ;
	        }

	    }, err => { console.log("InAppBrowser loadstop Event Error: " + err); });
	  //on closing the browser
/*	   browser.on("exit").subscribe( (event) => console.log("exit -->",event) ; ), err => {
	   console.log("InAppBrowser loadstart Event Error: " + err);*/
	  //});
//}

	}

	loadAllChapters( book_id ) {
		const loader = this.loadingCtrl.create({content: "Please wait..."});
		loader.present();

		this.http.get( this.chapter_url + book_id ).map( res => res.json() ).subscribe( data => { 

			this.chapters = data ;
			this.chapters.sort() ;
			console.log(data) ;

		    loader.dismiss() ;

		});

		console.log( "loadAllChapters" ) ;		
	}

	ionViewDidLoad() {

		this.selected_book = this.navParams.get( 'selected_book' ) ;

		console.log( "ionViewDidLoad" ) ;
		console.log( this.selected_book ) ;

		this.loadAllChapters( this.selected_book.id ) ;

	}

}
