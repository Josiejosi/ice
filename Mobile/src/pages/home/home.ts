import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, PopoverController } from 'ionic-angular';

import { NotificationsPage } from '../notifications/notifications';
import { SettingsPage } from '../settings/settings';

import { BooksDetailsPage } from '../books-details/books-details';

import { LoginPage } from '../login/login';

import { Storage } from '@ionic/storage';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	search_criteria: string = "" ;
	fullname: string = "Doe" ;
	all_books_url: string = "http://169.60.182.182/api/v1/books" ;
	filter_books_url: string = "http://169.60.182.182/api/v1/book/" ;
	assets_directory: string = "http://169.60.182.182/uploads/" ;

	pro_pic: any = "assets/imgs/avatar1.png" ;

	books: any = [] ;

	constructor(
		public navCtrl: NavController, 
		public popoverCtrl: PopoverController,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public storage: Storage,
		public http: Http
		) {

	}



	Search() {
		const loader = this.loadingCtrl.create({content: "Please wait..."});
		loader.present();

		if ( this.search_criteria != "" ) {

			console.log( this.filter_books_url + this.search_criteria ) ;

			this.http.get( this.filter_books_url + this.search_criteria ).map( res => res.json() ).subscribe( data => { 

				if ( "message" in data ) {

			    	const toast = this.toastCtrl.create({ message: data.message + " for search '"+this.search_criteria+"'", duration: 6000 }) ;
		    		toast.present() ;

		    		this.loadAllBooks() ;

				} else {

					this.search_criteria = "" ;

					this.books = data ;	

			    	const toast = this.toastCtrl.create({ message: data.length + " books found.", duration: 6000 }) ;
		    		toast.present() ;

				}

				console.log(data) ;

			    loader.dismiss() ;

			}, err => {
	            loader.dismiss() ;
	        }) ;	

		} else {
			this.loadAllBooks() ;
			loader.dismiss() ;
		}
	}

	// to go account page
	goToAccount() {
		this.navCtrl.push(SettingsPage);
	}

	selectBook( book ) {
		
		this.navCtrl.push( BooksDetailsPage, {  selected_book: book } ) ;

	}

	presentNotifications( myEvent ) {

		let popover = this.popoverCtrl.create(NotificationsPage) ;
		popover.present({
			ev: myEvent
		});

	}

	loadAllBooks() {

		const loader = this.loadingCtrl.create({content: "Please wait..."});
		loader.present();

		let loades = this.http.get( this.all_books_url ) ;
		loades.map( res => res.json() ).subscribe( data => { 

			this.books = data ;
			console.log(data) ;

		    loader.dismiss() ;

		}, err => {
            loader.dismiss() ;
        }) ;

	}


	ionViewDidLoad() {

        this.storage.get( 'pro_pic' ).then( propic => {
            if ( propic != null ) {
                this.pro_pic = propic ;
            }
        }) ;

        this.storage.get( 'profile' ).then( profile => {

            if ( profile != null || typeof(profile) != "undefined" ) {

                //this.fullname = profile.fullname ;
            }

        }) ; 

		this.loadAllBooks() ;

	}

}
