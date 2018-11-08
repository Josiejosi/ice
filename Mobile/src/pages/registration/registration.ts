import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AddProfilePage } from '../add-profile/add-profile';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

@Component({
	selector: 'page-registration',
	templateUrl: 'registration.html',
})
export class RegistrationPage {

	fullname: string ;
	age: string ;
	cell_phone_number: string ;
	gender: string ;
	province: string ;
	type_of_study: string ;
	institution: string ;
	field_of_study: string ;
	email: string ;
	password: string ;
	surname: string ;
	dob: string ;

	loadProgress: number ;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		private storage: Storage,
		public http: Http
		) {
	}

	login() {

		this.navCtrl.setRoot( LoginPage ) ;

	}

	add_profile() { 
		this.navCtrl.push( AddProfilePage, {
			fullname: this.fullname,
			cell_phone_number: this.cell_phone_number,
			email: this.email,
			surname: this.surname,
			dob: this.dob,	
			province: this.province,			
			password: this.password,			
		}) ;
	}

	register() {

	}

	ionViewDidLoad() {
		this.loadProgress = 20 ;
	}

}
