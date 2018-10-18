import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ListenPage } from '../listen/listen';

import { NotesPage } from '../notes/notes';


@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {

	title: any ;
	sound: any ;
	content: any ;

	constructor( public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController ) {
	}

	PlaySound( content ) {

		this.navCtrl.push( ListenPage, {  book: content, title: this.title, sound: this.sound } ) ;

	}

	public openModal() {

	    let data = { title : this.title } ;
	    let modalPage = this.modalCtrl.create( NotesPage, data ) ;
	    modalPage.present() ;
	    
	}

	ionViewDidLoad() {
		
		this.content = this.navParams.get( 'book' ) ;
		this.title = this.navParams.get( 'title' ) ;
		this.sound = this.navParams.get( 'sound' ) ;

	}

}
