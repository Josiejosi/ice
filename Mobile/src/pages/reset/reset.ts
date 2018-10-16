import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

@Component({
	selector: 'page-reset',
	templateUrl: 'reset.html',
})
export class ResetPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	login() {
		this.navCtrl.setRoot( LoginPage ) ;
	}

	reset() {
		
	}

	ionViewDidLoad() {
		
	}

}
