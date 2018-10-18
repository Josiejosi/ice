import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { BookmarksPage } from '../bookmarks/bookmarks';
import { BooksPage } from '../books/books';
import { ProfilePage } from '../profile/profile';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

	homePage = HomePage ;
	bookmarksPage = BookmarksPage ;
	booksPage = BooksPage ;
	profilePage = ProfilePage ;

}
