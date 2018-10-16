@extends('layouts.ellumin')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Books</div>

                <div class="card-body">

                    

                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Desc</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach( $books as $book )
                                <tr>
                                    <td>
                                        <span class="text-center">{{ $book->author }}</span>
                                    </td>
                                    <td>{{ $book->title }}</td>
                                    <td>{{ $book->description }}</td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>

                    

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
