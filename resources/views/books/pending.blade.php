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
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                @if ( count( $books ) )
                                @foreach( $books as $book )
                                <tr>
                                    <td>
                                        <span class="text-center">{{ $book->author }}</span>
                                    </td>
                                    <td>{{ $book->title }}</td>
                                    <td>{{ $book->description }}</td>
                                    
                                    @if ( $book->extension == "pdf" )
                                        <td><a href="{{ url( 'pdf/split/' ) }}/{{ $book->id }}">PDF Chapters</a></td>
                                    @else
                                        <td><a href="{{ url( 'epub/approve/' ) }}/{{ $book->id }}">EPUB Chapter</a></td>
                                    @endif

                                    <td><a href="{{ url( 'approve_book' ) }}/{{ $book->id }}">Approve</a></td>
                                </tr>
                                @endforeach
                                @else
                                    <td colspan="5">
                                        <span class="text-center">0 Pending...</span>
                                    </td>
                                @endif
                            </tbody>
                        </table>
                    </div>

                    

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
