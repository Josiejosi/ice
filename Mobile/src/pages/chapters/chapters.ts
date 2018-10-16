import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, PopoverController } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { PreviewPage } from '../preview/preview';
import { ListenPage } from '../listen/listen';
import { FullChapterPage } from '../full-chapter/full-chapter';

@Component({
	selector: 'page-chapters',
	templateUrl: 'chapters.html',
})
export class ChaptersPage {

	chapter_url: string = "http://169.60.182.182/api/v1/chapters/" ;

	chapters: any = [] ;

	selected_book_id: string = "" ;

	constructor(
		public navCtrl: NavController, 
		public popoverCtrl: PopoverController,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public http: Http,
		public navParams: NavParams
		) {
	}

	preview( content ) {
		
		console.log("preview") ;
		this.navCtrl.push( PreviewPage, {  book: content } ) ;

	}

	download( content ) {

		console.log("download") ;
		
		this.navCtrl.push( FullChapterPage, {  book: content } ) ;

	}

	listen( content ) {

		console.log("listen") ;

		this.navCtrl.push( ListenPage, {  book: content } ) ;

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
	}

	ionViewDidLoad() {

		console.log('ionViewDidLoad ChaptersPage');

		this.selected_book_id = this.navParams.get( 'book' ) ;

		this.loadAllChapters( this.selected_book_id ) ;

	}

}
