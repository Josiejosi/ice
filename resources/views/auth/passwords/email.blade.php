@extends('layouts.auth')

@section('content')
<body class="hold-transition bg-img dark" style="background-image: url( {{ asset('imgs/watergarden.jpg') }} );" data-overlay="4">
    
    <div class="container h-p100">
        <div class="row align-items-center justify-content-md-center h-p100">
            <div class="col-12">
                <div class="row no-gutters justify-content-md-center">
                    <div class="col-lg-4 col-md-5 col-12">
                        <div class="content-top-agile h-p100">
                            <h2>{{ __('Recover Password') }}</h2>                           
                        </div>              
                    </div>
                    <div class="col-lg-5 col-md-5 col-12">
                        <div class="p-40 bg-white content-bottom">
                            <form action="{{ route('password.email') }}" aria-label="{{ __('Reset Password') }}" method="post" class="
                            form-element">
                            @csrf
                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-email"></i></span>
                                        </div>
                                        
                                        <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}  pl-15" name="email" value="{{ old('email') }}" required placeholder="{{ __('E-Mail Address') }}">

                                        @if ($errors->has('email'))
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </span>
                                        @endif
                                    </div>
                                </div>
                                  <div class="row">
                                    <div class="col-12 text-center">
                                      <button type="submit" class="btn btn-info btn-block margin-top-10">{{ __('Reset') }}</button>
                                    </div>
                                    <!-- /.col -->
                                  </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>  

    <script src="{{ asset('js/app.js') }}" defer></script>

</body>
@endsection
