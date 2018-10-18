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

		console.log( playsound ) ;

		this.audio = new Audio();
		this.audio.src = playsound ;
		this.audio.load();
		this.audio.play();

/*		const fileTransfer: FileTransferObject = this.transfer.create();

		this.file.checkFile( this.file.dataDirectory, this.sound.toLowerCase() + ".mp3").then(
		    (res) => res,
		    (err) => false
		).then(fileExists => {
		    console.log('does my file exist?', fileExists);
			if (fileExists == true ) {
				this.nativeAudio.preloadComplex( 'play_chapter', this.file.dataDirectory + this.sound.toLowerCase() + ".mp3", 1, 1, 0 ).then(()=>{
					console.log("Playing") ;
				}, (err)=>{
					console.log(err) ;
				});				
			} else {
				fileTransfer.download(playsound, this.file.dataDirectory + this.sound.toLowerCase() + ".mp3").then((entry) => {
					console.log('download complete: ' + entry.toURL());

					this.nativeAudio.preloadComplex( 'play_chapter', entry.toURL(), 1, 1, 0 ).then(()=>{
						console.log("Playing") ;
					}, (err)=>{
						console.log(err) ;
					});

				}, (error) => {
				// handle error
				})
			}

		});*/




		//this.navCtrl.push( ListenPage, {  book: content, title: this.title, sound: this.sound } ) ;

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
