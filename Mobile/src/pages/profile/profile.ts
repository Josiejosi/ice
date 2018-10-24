import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage' ;

import { Camera, CameraOptions } from '@ionic-native/camera';

import { GlobalsProvider } from '../../providers/globals/globals';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	fullname: string = "Jon" ;
	age: string = "30" ;
	cell_phone_number: string = "0123456789" ;
	gender: string = "Male" ;
	province: string = "None" ;
	type_of_study: string = "None" ;
	institution: string = "Tuks" ;
	field_of_study: string = "Accounting" ;
	email: string = "jondoe@gmail.com" ;
	surname: string = "Doe" ;

	pro_pic: any = "assets/imgs/avatar1.png" ;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public storage: Storage,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		private camera: Camera,
		public global: GlobalsProvider
		) {}

	takePhoto(sourceType:number) {

		const loader = this.loadingCtrl.create({content: "Profile Picture upload..."});
		loader.present();

	    const options: CameraOptions = {

	     	quality: 50,
	     	destinationType: this.camera.DestinationType.DATA_URL,
	     	encodingType: this.camera.EncodingType.JPEG,
	     	mediaType: this.camera.MediaType.PICTURE,
	    	correctOrientation: true,
	    	sourceType:sourceType,

	    }

	    this.camera.getPicture(options).then( ( imageData ) => {

	    	let base64Image = 'data:image/jpeg;base64,' + imageData ;
	    	this.global.avatar=base64Image ;

	    	this.storage.set( 'pro_pic', base64Image ).then( () => {

			   	const toast = this.toastCtrl.create({ message: "Profile Picture update was successful", duration: 6000 }) ;
		    	toast.present() ;

          		this.loadProfile() ;

          		loader.dismiss() ;

        	}) ;

	    }, ( err ) => { console.log( err ) ; loader.dismiss() ; }) ;

	}


	handleFileSelect(evt) {

		this.takePhoto( 0 ) ;

	}

	update_profile() {

		const loader = this.loadingCtrl.create({content: "Profile upload.."});
		loader.present();

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
			surname: this.surname,

		} ;

		this.storage.set( 'profile', profile ).then( () => {

			const toast = this.toastCtrl.create({ message: "Profile update was successful", duration: 6000 }) ;
		    toast.present() ;

            this.loadProfile() ;
            loader.dismiss() ;
        }) ; 

	}

	loadProfile() {
        this.storage.get( 'pro_pic' ).then( propic => {
            if ( propic != null ) {
                this.global.avatar = propic ;
            }
        }) ;

        this.storage.get( 'profile' ).then( profile => {

            if ( profile != null || typeof(profile) != "undefined" ) {

            	this.global.fullname 	= profile.fullname + " " + profile.surname  ;

                this.fullname 			= profile.fullname  ;
				this.surname  			= profile.surname ;
				this.age  				= profile.age ;
				this.cell_phone_number  = profile.cell_phone_number ;
				this.gender  			= profile.gender ;
				this.province  			= profile.province ;
				this.type_of_study  	= profile.type_of_study ;
				this.institution  		= profile.institution ;
				this.field_of_study  	= profile.field_of_study ;
				this.email  			= profile.email ;

            }

        }) ; 
	}

	ionViewDidLoad() {

       this.loadProfile() ; 

	}

}
