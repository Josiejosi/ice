import { Component } from '@angular/core';
import { NavController, NavParams , ToastController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-add-studies',
  templateUrl: 'add-studies.html',
})
export class AddStudiesPage {

	loadProgress: number ;

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

	study_years: number ;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		private storage: Storage,
		public http: Http
		) {
	}

	select_years( selected_year ) {
		this.study_years = selected_year ;
	}

	first_login() {

		//{email}/{name}/{password}/{surname}/{cell_phone_number}/{gender}/{province}/{type_of_study}/{institution}/{field_of_study}
		

		let url = "http://169.60.182.182//api/v1/register/"+this.email+"/"+this.fullname+"/"+this.password+"/"+this.surname+"/"+this.cell_phone_number+"/"+this.gender+"/"+this.province+"/"+this.type_of_study+"/"+this.institution+"/"+this.field_of_study ;

		const loader = this.loadingCtrl.create({content: "Please wait..."});
		loader.present();

		this.http.get( url ).map( res => res.json() ).subscribe( data => { 

		    if ( "message" in data ) {

		    	if ( data.message == "success" ) {

			    	let alert_message = "Welcome to E-llumin8, " + this.fullname + "!" ;

			    	const toast = this.toastCtrl.create({ message: alert_message, duration: 6000 }) ;
		    		toast.present() ;

		    		let profile = {
						fullname: this.fullname,
						age: this.age,
						cell_phone_number: this.cell_phone_number,
						gender: this.gender,
						province: this.province,
						type_of_study: this.type_of_study,
						institution: this.institution,
						field_of_study: this.field_of_study,
						email: this.email,
						password: this.password,
						surname: this.surname,
						dob: this.dob,

		    		} ;

		    		this.storage.set( 'profile', profile ) ; 

		    		this.navCtrl.setRoot( LoginPage ) ;

		    	} else {

			    	const toast = this.toastCtrl.create({ message: data.message, duration: 6000 }) ;
		    		toast.present() ;
		    	}



		    } else {

		    	let message = "We are currently experincing technical problems, please try later." ;

		    	const toast = this.toastCtrl.create({ message: data.message, duration: 6000 }) ;
	    		toast.present() ;

		    }

		    loader.dismiss() ;

		});	

	}

	ionViewDidLoad() {
		this.loadProgress = 85 ;
		this.fullname = this.navParams.get('fullname');
		this.surname = this.navParams.get('surname');
		this.cell_phone_number = this.navParams.get('cell_phone_number');
		this.email = this.navParams.get('email');
		this.dob = this.navParams.get('dob');
		this.province = this.navParams.get('province');
		this.gender = this.navParams.get('gender');
		this.password = this.navParams.get('password');
		console.log( this.password );
	}

}
