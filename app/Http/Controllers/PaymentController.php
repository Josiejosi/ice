<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function return(Request $request) {
    	return view('payment.return' ) ;
    }
    public function cancel(Request $request) {
    	return view('payment.cancel' ) ;
    }
    public function notify(Request $request) {

    }
    
	public function pay( $chapter, $title) {

		$data = [
		    // Merchant details
		    'merchant_id' => '12966341',
		    'merchant_key' => '5018xj78swngr',
		    'return_url' => url('/') . '/payment/return',
		    'cancel_url' => url('/') . '/payment/cancel',
		    'notify_url' => url('/') . '/payment/notify',
		    // Buyer details
		    'name_first' => 'Tebogo',
		    'name_last'  => 'Sewape',
		    'email_address'=> 'sewapetj@gmail.com',
		    // Transaction details
		    'm_payment_id' => rand( 1111111111,999999999 ), //Unique payment ID to pass through to notify_url
		    // Amount needs to be in ZAR
		    // If multicurrency system its conversion has to be done before building this array
		    'amount' => number_format( sprintf( "%.2f", 25 ), 2, '.', '' ),
		    'item_name' => $chapter . " - " . $title,
		    'item_description' => $title,
		    'custom_int1' => rand( 1111111111,999999999 ), //custom integer to be passed through           
		    'custom_str1' => "Chapter " . $chapter . " - " . $title
		] ;   

		$pfOutput  = "" ;     

		// Create GET string
		foreach( $data as $key => $val )
		{
		    if(!empty($val))
		     {
		        $pfOutput .= $key .'='. urlencode( trim( $val ) ) .'&';
		     }
		}
		// Remove last ampersand
		$getString = substr( $pfOutput, 0, -1 );
		if( isset( $passPhrase ) )
		{
		    $getString .= '&passphrase='. urlencode( trim( $passPhrase ) ) ;
		}   
		$data['signature'] = md5( $getString ) ;

		$url = "https://www.payfast.co.za/eng/process/?" . $getString ;

		return redirect( $url ) ;

	}
}
