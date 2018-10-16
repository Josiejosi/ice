import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AddStudiesPage } from '../add-studies/add-studies';

import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-add-profile',
  templateUrl: 'add-profile.html',
})
export class AddProfilePage {

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

	file_upload: File ;

	base64textString: any ;

	pro_pic: any = "assets/imgs/avatar1.png" ;

	constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private camera: Camera) {
	}
	
 //take Photo
  takePhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.pro_pic=base64Image;
      this.storage.set( 'pro_pic', base64Image ) ;
    }, (err) => { console.log(err) ; });
  }


	handleFileSelect(evt){
		this.takePhoto( 0 ) ;
	    // var files = evt.target.files;
	    // var file = files[0];

	    // if (files && file) {
	    //     var reader = new FileReader();

	    //     reader.onload =this._handleReaderLoaded.bind(this);

	    //     reader.readAsBinaryString(file);
	    // }
	}

	_handleReaderLoaded(readerEvt) {
	    var binaryString = readerEvt.result;

	    this.pro_pic = "data:image/png;base64," + btoa(binaryString);

	    this.storage.set('pro_pic', this.pro_pic) ;
	}

	select_gender( selected_gender ) {
		this.gender = selected_gender ;
	}

	add_qualification() {

		this.navCtrl.push( AddStudiesPage, {
			fullname: this.fullname,
			cell_phone_number: this.cell_phone_number,
			email: this.email,
			surname: this.surname,
			dob: this.dob,	
			gender: this.gender,		
			password: this.password,		
		}) ;		
	}

	ionViewDidLoad() {
		this.loadProgress = 50 ;
		this.fullname = this.navParams.get('fullname');
		this.surname = this.navParams.get('surname');
		this.cell_phone_number = this.navParams.get('cell_phone_number');
		this.email = this.navParams.get('email');
		this.dob = this.navParams.get('dob');
		this.password = this.navParams.get('password');
		console.log(this.password);
	}

}
