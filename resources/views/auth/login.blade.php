@extends('layouts.auth')

@section('content')
<body class="hold-transition bg-img dark" style="background-image: url( {{ asset('imgs/watergarden.jpg') }} );" data-overlay="4">
    
    <div class="container h-p100">
        <div class="row align-items-center justify-content-md-center h-p100">           
            <div class="col-12">
                <div class="row no-gutters justify-content-md-center">
                    <div class="col-lg-4 col-md-5 col-12">
                        <div class="content-top-agile h-p100">
                            <h2>Get started <br> with Us</h2>
                            <p class="text-white">Sign in to start your session</p>

                            <div class="text-center text-white">
                              <p class="mt-20">- Sign With -</p>
                              <p class="gap-items-2 mb-20">
                                  <a class="btn btn-social-icon btn-outline btn-white" href="#"><i class="fa fa-facebook"></i></a>
                                  <a class="btn btn-social-icon btn-outline btn-white" href="#"><i class="fa fa-twitter"></i></a>
                                </p>    
                            </div>
                            
                        </div>              
                    </div>
                    <div class="col-lg-5 col-md-5 col-12">
                        <div class="p-40 bg-white content-bottom h-p100">
                            <form action="{{ route('login') }}" aria-label="{{ __('Login') }}" method="post" class="form-element">
                                @csrf
                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-user"></i></span>
                                        </div>
                                        
                                        <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }} pl-15" name="email" value="{{ old('email') }}" required autofocus placeholder="{{ __('E-Mail Address') }}">

                                        @if ($errors->has('email'))
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </span>
                                        @endif
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-lock"></i></span>
                                        </div>
                                        
                                        <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}  pl-15" name="password" required placeholder="{{ __('Password') }}">

                                        @if ($errors->has('password'))
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('password') }}</strong>
                                            </span>
                                        @endif

                                    </div>
                                </div>
                                  <div class="row">
                                    <div class="col-6">
                                      <div class="checkbox">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                        <label for="remember">{{ __('Remember Me') }}</label>
                                      </div>
                                    </div>
                                    <!-- /.col -->
                                    <div class="col-6">
                                     <div class="fog-pwd text-right">
                                        <a href="{{ route('password.request') }}"><i class="ion ion-locked"></i> {{ __('Forgot Your Password?') }}</a><br>
                                      </div>
                                    </div>
                                    <!-- /.col -->
                                    <div class="col-12 text-center">
                                      <button type="submit" class="btn btn-info btn-block margin-top-10">{{ __('Login') }}</button>
                                    </div>
                                    <!-- /.col -->
                                  </div>
                            </form>     

                            <div class="text-center">
                                <p class="mt-15 mb-0">{{ __('Don\'t have an account?') }} <a href="{{ route('register') }}" class="text-info ml-5">{{ __('Register') }}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="{{ asset('js/app.js') }}" defer></script>

</body>
@endsection
