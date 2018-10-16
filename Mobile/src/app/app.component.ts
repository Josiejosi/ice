import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

import { MainPage } from '../pages/main/main';

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;

    rootPage: any ;

    appMenuItems: Array<MenuItem>;

    fullname: string = "Doe" ;

    pro_pic: any = "assets/imgs/avatar1.png" ;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();

            storage.get( 'pro_pic' ).then( propic => {
                if ( propic != null ) {
                    this.pro_pic = propic ;
                }
            }) ;
            storage.get( 'profile' ).then( profile => {

                if ( profile != null ) {

                    this.fullname = profile.fullname ;

                    this.rootPage = HomePage ;
                } else {
                    this.rootPage = MainPage ;
                }

            }) ; 

        });
        
    }

    openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    profile() {
        this.nav.setRoot( ProfilePage ) ;
    }

    logout() {

        this.storage.clear() ;

        this.nav.setRoot( LoginPage ) ;

    }

}

