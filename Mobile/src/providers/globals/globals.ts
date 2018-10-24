import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsProvider {

	public fullname: string = "John" ;
	public surname: string = "Doe" ;
	public email: string ;
	public avatar: string = "assets/imgs/avatar1.png" ;

	public app_url: string = "http://169.60.182.182/" ;
	public api_url: string = "http://169.60.182.182/api/v1/" ;

	public user_id: number = 1 ;

	constructor() {}

}
