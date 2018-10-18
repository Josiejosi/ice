import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	fullname: string = "Tebogo" ;
	age: string = "30" ;
	cell_phone_number: string = "278353201" ;
	gender: string = "Male" ;
	province: string = "Gauteng" ;
	type_of_study: string = "PostGrad" ;
	institution: string = "TUT" ;
	field_of_study: string = "ICT" ;
	email: string = "tebogo@gmail.com" ;

	constructor(public navCtrl: NavController, public navParams: NavParams) {}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad ProfilePage');
	}

}
