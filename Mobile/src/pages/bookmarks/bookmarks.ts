import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
	selector: 'page-bookmarks',
	templateUrl: 'bookmarks.html',
})
export class BookmarksPage {

	books: any = [] ;

	filter_books_url: string = "http://169.60.182.182/api/v1/book/" ;

	assets_directory: string = "http://169.60.182.182/uploads/" ;

	number_of_pages: number = 0 ;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public storage: Storage, 
		public toastCtrl: ToastController, 
		public loadingCtrl: LoadingController ,
		public http: Http
		) {}

	ionViewDidLoad() {

		const loader = this.loadingCtrl.create({content: "Loading bookmarks..."});
		loader.present();

	    this.storage.get( 'bookmark' ).then( bookmark_data => {


	    	if ( bookmark_data != null ) {

	    		this.number_of_pages = bookmark_data.number_of_pages ;

				this.http.get( this.filter_books_url + bookmark_data.title ).map( res => res.json() ).subscribe( data => { 

					if ( "message" in data ) {

				    	const toast = this.toastCtrl.create({ message: "No bookmarks found.", duration: 6000 }) ;
			    		toast.present() ;

					} else {

						this.books = data ;	

				    	const toast = this.toastCtrl.create({ message: data.length + " books found.", duration: 6000 }) ;
			    		toast.present() ;

					}

				    loader.dismiss() ;

				}, err => {
		            loader.dismiss() ;
		        }) ;
	    	}

	    });

	}

}
