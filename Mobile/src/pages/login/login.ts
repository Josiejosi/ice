import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { RegistrationPage } from '../registration/registration';
import { ResetPage } from '../reset/reset';

import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	email: string ;
	password: string ;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		private storage: Storage,
		public http: Http

		) {
	}

	forgotPass() {

		this.navCtrl.setRoot( ResetPage ) ;

	}

	login() {
		

		let url = "http://169.60.182.182/api/v1/login/"+this.email+"/"+this.password ;

		const loader = this.loadingCtrl.create({content: "Please wait..."});
		loader.present();

		this.http.get( url ).map( res => res.json() ).subscribe( data => { 

		    if ( "message" in data ) {

		    	if ( data.message == "failed" ) {

		    		let message = "Wrong combination, Please try with valid credentials" ;

			    	const toast = this.toastCtrl.create({ message: message, duration: 6000 }) ;
		    		toast.present() ;
		    	}



		    } else {

		    	let alert_message = "Welcome back to E-llumin8" ;

		    	const toast = this.toastCtrl.create({ message: alert_message, duration: 6000 }) ;
	    		toast.present() ;

	    		let profile = {
					fullname: data.name,
					email: data.email
	    		} ;

	    		this.storage.set( 'profile', profile ) ; 

	    		this.navCtrl.setRoot( HomePage ) ;


		    }

		    loader.dismiss() ;

		});

	}

	register() {

		this.navCtrl.setRoot( RegistrationPage ) ;

	}

	ionViewDidLoad() {
		
	}

}
