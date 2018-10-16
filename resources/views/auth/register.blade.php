@extends('layouts.auth')

@section('content')
<body class="hold-transition bg-img dark" style="background-image: url( {{ asset('imgs/watergarden.jpg') }} );" data-overlay="4">

    <div class="container"><h1 class="text-center">STUDENTS REGISTRATION</h1></div>
    
    <div class="container h-p100">
        <div class="row align-items-center justify-content-md-center h-p100">
            <div class="col-12">
                <div class="row no-gutters justify-content-md-center">
                    <div class="col-lg-4 col-md-5 col-12">
                        <div class="content-top-agile h-p100">
                            <h2>{{ __('Get started') }} <br> {{ __('with Us') }}</h2>
                            <p class="text-white">{{ __('Student Registration') }}</p>

                            <div class="text-center text-white">
                              <p class="mt-20">{{ __('- Register With -') }}</p>
                              <p class="gap-items-2 mb-20">
                                  <a class="btn btn-social-icon btn-outline btn-white" href="#"><i class="fa fa-facebook"></i></a>
                                  <a class="btn btn-social-icon btn-outline btn-white" href="#"><i class="fa fa-twitter"></i></a>
                                </p>    
                            </div>
                            
                        </div>              
                    </div>
                    <div class="col-lg-5 col-md-5 col-12">
                        <div class="p-40 bg-white content-bottom">
                            <form action="{{ route('register') }}" aria-label="{{ __('Register') }}" method="post" class="form-element">
                                 @csrf
                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-user"></i></span>
                                        </div>
                                        <input id="name" type="text" 
                                            class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }} pl-15" 
                                            placeholder="{{ __('Full Name') }}" 
                                            name="name" 
                                            value="{{ old('name') }}" 
                                            required autofocus>

                                        @if ($errors->has('name'))
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('name') }}</strong>
                                            </span>
                                        @endif
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-user"></i></span>
                                        </div>
                                        <input id="age" type="text" 
                                            class="form-control pl-15" 
                                            placeholder="{{ __('Age') }}" 
                                            name="age" 
                                            value="{{ old('age') }}">
                                    </div>
                                </div>                                

                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-user"></i></span>
                                        </div>
                                        <input 
                                            id="cell_phone" 
                                            type="text" 
                                            class="form-control pl-15" 
                                            placeholder="{{ __('Cell Phone Number') }}" 
                                            name="cell_phone" 
                                            value="{{ old('cell_phone') }}">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-user"></i></span>
                                        </div>
                                        <select id="gender" 
                                            class="form-control pl-15" 
                                            placeholder="{{ __('Gender') }}" 
                                            name="gender" 
                                            value="{{ old('gender') }}">
                                            <option>Not important</option>
                                            <option>Female</option>
                                            <option>Male</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-user"></i></span>
                                        </div>
                                        <select id="province" 
                                            class="form-control pl-15" 
                                            placeholder="{{ __('Province') }}" 
                                            name="province" 
                                            value="{{ old('province') }}">
                                            <option>Eastern Cape</option>
                                            <option>Free State</option>
                                            <option>Gauteng</option>
                                            <option>KwaZulu-Natal</option>
                                            <option>Limpopo</option>
                                            <option>Mpumalanga</option>
                                            <option>Northern Cape</option>
                                            <option>North West</option>
                                            <option>Western Cape</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-book"></i></span>
                                        </div>
                                        <select id="student" 
                                            class="form-control pl-15" 
                                            placeholder="{{ __('Student') }}" 
                                            name="student" 
                                            value="{{ old('student') }}">
                                            <option>High School</option>
                                            <option>Undergraduate/</option>
                                            <option>Postgraduate</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-book"></i></span>
                                        </div>
                                        <input 
                                            id="field_of_study" 
                                            type="text" 
                                            class="form-control pl-15" 
                                            placeholder="{{ __('Field of study') }}" 
                                            name="field_of_study" 
                                            value="{{ old('field_of_study') }}">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-book"></i></span>
                                        </div>
                                        <input 
                                            id="institution" 
                                            type="text" 
                                            class="form-control pl-15" 
                                            placeholder="{{ __('Institution') }}" 
                                            name="institution" 
                                            value="{{ old('institution') }}">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-email"></i></span>
                                        </div>

                                        <input 
                                            id="email" 
                                            type="email" 
                                            class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }} pl-15"
                                            placeholder="{{ __('Email') }}"  
                                            name="email" 
                                            value="{{ old('email') }}" required>

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

                                        <input 
                                            id="password" 
                                            type="password" 
                                            class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }} pl-15" 
                                            placeholder="{{ __('Password') }}"
                                            name="password" required>

                                        @if ($errors->has('password'))
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('password') }}</strong>
                                            </span>
                                        @endif

                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info border-info"><i class="ti-lock"></i></span>
                                        </div>
                                        <input id="password-confirm" placeholder="{{ __('Confirm Password') }}" type="password" class="form-control pl-15" name="password_confirmation" required>
                                    </div>
                                </div>
                                  <div class="row">
                                    <div class="col-12">
                                      <div class="checkbox">
                                        <input type="checkbox" id="basic_checkbox_1" >
                                        <label for="basic_checkbox_1">{{ __('I agree to the') }} <a href="#" class="text-warning"><b>{{ __('Terms') }}</b></a></label>
                                      </div>
                                    </div>
                                    <!-- /.col -->
                                    <div class="col-12 text-center">
                                      <button type="submit" class="btn btn-info btn-block margin-top-10">{{ __('Register') }}</button>
                                    </div>
                                    <!-- /.col -->
                                  </div>
                            </form> 

                            <div class="text-center">
                                <p class="mt-15 mb-0">{{ __('Already have an account?') }}<a href="{{ route('login') }}" class="text-danger ml-5"> {{ __('Login') }}</a></p>
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
