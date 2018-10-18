import { Component } from '@angular/core';
import { NavController, PopoverController, ToastController, LoadingController } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { BooksDetailsPage } from '../books-details/books-details';


@Component({
	selector: 'page-books',
	templateUrl: 'books.html',
})
export class BooksPage {

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
		public http: Http
	) {}

	ionViewDidLoad() {
		this.loadAllBooks() ;
	}

	preview(book) {
		this.navCtrl.push( BooksDetailsPage, {  selected_book: book } ) ;
	}

	download(book) {
		this.navCtrl.push( BooksDetailsPage, {  selected_book: book } ) ;
	}

	loadAllBooks() {

		const loader = this.loadingCtrl.create({content: "Loading books..."});
		loader.present();

		let loades = this.http.get( this.all_books_url ) ;
		loades.map( res => res.json() ).subscribe( data => { 

			this.books = data ;

		    loader.dismiss() ;

		}, err => {
            loader.dismiss() ;
        }) ;

	}

}
