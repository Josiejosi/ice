import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ListenPage } from '../listen/listen';

@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html',
})
export class PreviewPage {

	title: any ;
	sound: any ;
	content: any ;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	PlaySound( content ) {

		this.navCtrl.push( ListenPage, {  book: content, title: this.title, sound: this.sound } ) ;

	}



	ionViewDidLoad() {
		
		this.content = this.navParams.get( 'book' ) ;
		this.title = this.navParams.get( 'title' ) ;
		this.sound = this.navParams.get( 'sound' ) ;

	}

}
