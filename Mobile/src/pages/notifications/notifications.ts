import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
	selector: 'page-notifications',
	templateUrl: 'notifications.html',
})
export class NotificationsPage {

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

	close() {
		this.viewCtrl.dismiss();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad NotificationsPage');
	}

}
