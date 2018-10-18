import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})

export class NotesPage {

	note: string ;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public viewCtrl : ViewController, 
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController
		) {}

	public closeModal(){
		this.viewCtrl.dismiss() ;
	}

	SavaData() {

		const loader = this.loadingCtrl.create({content: "Adding notes..."});
		loader.present();

		const toast = this.toastCtrl.create({ message: "Note recorded successfully.", duration: 6000 }) ;
		toast.present() ;

		this.viewCtrl.dismiss() ;

		loader.dismiss() ;
	}

	ionViewDidLoad() {
		
	}

}
