import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';

import { ListenPage } from '../listen/listen';

import { NotesPage } from '../notes/notes';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { GlobalsProvider } from '../../providers/globals/globals' ;

@Component({
	selector: 'page-full-chapter',
	templateUrl: 'full-chapter.html',
})
export class FullChapterPage {

	title: any ;
	sound: any ;
	content: any = "" ;
	book: any ;
	chapter_number: any ;

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

		this.navCtrl.push( ListenPage, {  title: this.title, sound: this.sound } ) ;

	}

	public openModal() {

	    let data = { title : this.title } ;
	    let modalPage = this.modalCtrl.create( 'NotesPage', data ) ;
	    modalPage.present() ;
	    
	}

	getFullChapter(book_id) {
		let get_chapter = this.global.api_url + "fullchapter/" + book_id ;

		const loader = this.loadingCtrl.create({content: "Loading chapter..."}) ;
		loader.present();

		this.http.get( get_chapter ).subscribe( data => { 

			this.content = data.text() ;

		    loader.dismiss() ;

		}, err => {
            loader.dismiss() ;
        }) ;

	}

	ionViewDidLoad() {

		this.book = this.navParams.get( 'chapter' ) ;
		
		this.getFullChapter(this.book.id) ;
		this.title = this.book.name ;
		this.sound = this.book.audio_url ;
		this.chapter_number = this.book.chapter_number ;

	}

}
