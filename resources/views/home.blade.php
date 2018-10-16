@extends('layouts.ellumin')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br> 
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                        </div>
                    @endif

                    @if( auth()->user()->hasRole('publisher') ) 
                        
                        <form action="{{ url('/upload/book') }}" method="post" enctype="multipart/form-data">

                            @csrf

                            <div class="form-group">
                                <label for="book_title">Book Title:</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="book_title" 
                                    placeholder="Book Title" 
                                    value="{{ old('book_title') }}" 
                                    name="book_title">
                            </div>

                            <div class="form-group">
                                <label for="book_desc">Book Description:</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="book_desc" 
                                    placeholder="Book Description" 
                                    value="{{ old('book_desc') }}" 
                                    name="book_desc">
                            </div>

                            <div class="form-group">
                                <label for="book_imei_number">Book IMEI number:</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="book_imei_number" 
                                    placeholder="Book IMEI number"
                                    value="{{ old('book_imei_number') }}"  
                                    name="book_imei_number">
                            </div>

                            <div class="form-group">
                                <label for="book_author">Book Author:</label>
                                <textarea 
                                    class="form-control" 
                                    id="book_author" 
                                    placeholder="Book Author"
                                    name="book_author">{{ old('book_author') }}</textarea>
                            </div>

                            <div class="form-group">
                                <label for="author_review">Author Review:</label>
                                <textarea 
                                    class="form-control" 
                                    id="author_review" 
                                    placeholder="Author Review" 
                                    name="author_review">{{ old('author_review') }}</textarea>
                            </div>

                            <div class="form-group">
                                <label for="book_cover">Book Cover (250px by 600px):</label>
                                <input 
                                    type="file" 
                                    class="form-control" 
                                    id="book_cover" 
                                    placeholder="Book Cover" 
                                    value="{{ old('book_cover') }}"
                                    name="book_cover">
                            </div>

                            <div class="form-group">
                                <label for="book">Book Content (EPUB, OR PDF):</label>
                                <input 
                                    type="file" 
                                    class="form-control" 
                                    id="book" 
                                    placeholder="Book Content" 
                                    value="{{ old('book') }}"
                                    name="book">
                            </div>

                            <button type="submit" class="btn btn-primary">Upload Ebook</button>
                        </form>

                    @else

                        <h1 class="text-center">Suggested Books</h1>

                    @endif

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
