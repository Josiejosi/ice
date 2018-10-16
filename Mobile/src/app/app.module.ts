import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { ResetPage } from '../pages/reset/reset';
import { ProfilePage } from '../pages/profile/profile';
import { BooksDetailsPage } from '../pages/books-details/books-details';
import { CheckOutPage } from '../pages/check-out/check-out';
import { NotificationsPage } from '../pages/notifications/notifications';
import { SettingsPage } from '../pages/settings/settings';
import { ChaptersPage } from '../pages/chapters/chapters';
import { PreviewPage } from '../pages/preview/preview';
import { ListenPage } from '../pages/listen/listen';
import { FullChapterPage } from '../pages/full-chapter/full-chapter';
import { MainPage } from '../pages/main/main';
import { AddProfilePage } from '../pages/add-profile/add-profile';
import { AddStudiesPage } from '../pages/add-studies/add-studies';
import { FirstLoginPage } from '../pages/first-login/first-login';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

import { HttpModule } from '@angular/http';

import { IonicStorageModule } from '@ionic/storage';

import { TextToSpeech } from '@ionic-native/text-to-speech';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NativeAudio } from '@ionic-native/native-audio';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { GlobalsProvider } from '../providers/globals/globals';

import { Camera, CameraOptions } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    ResetPage,
    ProfilePage,
    BooksDetailsPage,
    CheckOutPage,
    NotificationsPage,
    SettingsPage,
    ChaptersPage,
    PreviewPage,
    ListenPage,
    FullChapterPage,
    MainPage,
    AddProfilePage,
    FirstLoginPage,
    AddStudiesPage,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({name: '_elluminate'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    ResetPage,
    ProfilePage,
    BooksDetailsPage,
    CheckOutPage,
    NotificationsPage,
    SettingsPage,
    ChaptersPage,
    PreviewPage,
    ListenPage,
    FullChapterPage,
    MainPage,
    AddProfilePage,
    FirstLoginPage,
    AddStudiesPage,
    ProgressBarComponent
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TextToSpeech,
    InAppBrowser,
    NativeAudio,
    FileTransfer,
    Camera,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalsProvider
  ]
})
export class AppModule {}
