import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RegistrationPage } from '../registration/registration';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	login() {
		this.navCtrl.setRoot( LoginPage ) ;
	}

	register() {
		this.navCtrl.setRoot( RegistrationPage ) ;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MainPage');
	}

}
