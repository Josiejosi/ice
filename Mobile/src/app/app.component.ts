import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';

import { BookmarksPage } from '../pages/bookmarks/bookmarks';
import { BooksPage } from '../pages/books/books';


import { TabsPage } from '../pages/tabs/tabs';

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

    constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, public storage: Storage) {

        this.initializeApp() ;

        this.appMenuItems = [
            {title: 'Home', component: HomePage, icon: 'home'},
            {title: 'Bookmarks', component: BookmarksPage, icon: 'bookmark'},
            {title: 'Books', component: BooksPage, icon: 'book'},
            {title: 'Edit Profile', component: ProfilePage, icon: 'person'}
        ];
    }

    initializeApp() {

        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.storage.get( 'pro_pic' ).then( propic => {
                if ( propic != null  ) {
                    this.pro_pic = propic ;
                }
            }) ;
            this.storage.get( 'profile' ).then( profile => {

                if ( profile != null ) {

                    //this.fullname = profile.fullname ;

                    this.rootPage = TabsPage ;
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

