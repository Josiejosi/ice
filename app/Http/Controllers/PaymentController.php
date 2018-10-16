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
}
