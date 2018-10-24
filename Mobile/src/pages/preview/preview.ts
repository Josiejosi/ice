import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { ListenPage } from '../listen/listen';

import { NotesPage } from '../notes/notes';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { GlobalsProvider } from '../../providers/globals/globals' ;


@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {

	title: any ;
	sound: any ;
	content: any ;
	book: any ;

	constructor( 
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public modalCtrl : ModalController,
		public loadingCtrl: LoadingController,
		public http: Http,
		public global: GlobalsProvider  
	) {
	}

	PlaySound( content ) {

		this.navCtrl.push( ListenPage, {  book: content, title: this.title, sound: this.sound } ) ;

	}

	getPreviewChapter(book_id) {
		let get_chapter = this.global.api_url + "/previewchapter/" + book_id ;

		const loader = this.loadingCtrl.create({content: "Loading preview..."}) ;
		loader.present();

		this.http.get( get_chapter ).map( res => res.json() ).subscribe( data => { 

			this.content = data ;

			console.log( data ) ; 

		    loader.dismiss() ;

		}, err => {
            loader.dismiss() ;
        }) ;

	}

	public openModal() {

	    let data = { title : this.title } ;
	    let modalPage = this.modalCtrl.create( NotesPage, data ) ;
	    modalPage.present() ;
	    
	}

	ionViewDidLoad() {
		
		this.book = this.navParams.get( 'chapter' ) ;
		
		this.getPreviewChapter(this.book)
		this.title = this.book.title ;
		this.sound = this.book.audio_url ;
		this.chapter_number = this.book.chapter_number ;

	}

}
