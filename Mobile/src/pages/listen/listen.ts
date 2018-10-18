import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TextToSpeech } from '@ionic-native/text-to-speech';

import { NativeAudio } from '@ionic-native/native-audio';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-listen',
  templateUrl: 'listen.html',
})
export class ListenPage {

	content: any ;
	title: any ;
	sound: any ;
	audio: any ;

	loadProgress: number = 5 ;

	play_url: string = "http://169.60.182.182/uploads/books/publisher_id_2/" ;

	constructor( 
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private tts: TextToSpeech, 
		private transfer: FileTransfer, 
		private file: File,
		private nativeAudio: NativeAudio ) {
	}



	PlaySound( ) {

		let playsound = this.play_url + this.title + "/audio/" + this.sound.toLowerCase() + ".mp3" ;

		this.audio = new Audio();
		this.audio.src = playsound ;
		this.audio.load();
		this.audio.play();

	}

	StopSound() {
		this.audio.pause();
	}



	ionViewDidLoad() {
		
		this.content = this.navParams.get( 'book' ) ;
		this.title = this.navParams.get( 'title' ) ;
		this.sound = this.navParams.get( 'sound' ) ;

	}

}
