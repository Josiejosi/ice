import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FullChapterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
	selector: 'page-full-chapter',
	templateUrl: 'full-chapter.html',
})
export class FullChapterPage {

	content: any ;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		
		this.content = this.navParams.get( 'param1' ) ;
		console.log( this.content ) ;

	}

}
