@extends('layouts.ellumin')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ $book->title }} - Split Chapters</div>

                <div class="card-body">
                	<div class="col-6 col-offset-3 text-center">
                		<a type="submit" class="btn btn-warning btn-block margin-top-10">{{ __('Preview Book') }}</a>
                	</div>
	
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th colspan="3">Chapters captured.</th>
                                </tr>
                            </thead>
                            <tbody>
                                @if ( count( $chapters ) )
                                @foreach( $chapters as $chapter )
                                <tr>
                                    <td>
                                        <span class="text-center">Chapter {{ $chapter->chapter_number }}</span>
                                    </td>
                                    <td>{{ $chapter->name }}</td>
                                    <td>Page(s) {{ $chapter->number_of_pages }}</td>
                                </tr>
                                @endforeach
                                @else
                                    <td colspan="5">
                                        <span class="text-center">0 Chapters</span>
                                    </td>
                                @endif
                            </tbody>
                        </table>
                    </div>

                    <form action="{{ url('/pdf/chapter/create') }}" method="post" class="form-element">
                        @csrf
	                    <div class="form-group">
	                                        
	                        <select id="chapter_number" class="form-control pl-15" name="chapter_number" placeholder="Create new PDF Chapter">
								<option disabled="true">Chapter Number</option>
	                            <?php 
	                                for ( $i=1; $i < 30; $i++ ) { 
	                                    echo "<option value='$i'>Chapter $i</option>" ;
	                                }
	                            ?>

	                        </select>

	                        <!-- chapters -->

	                        <select id="start_page" class="form-control pl-15" name="start_page" placeholder="Create new PDF Chapter">
								<option disabled="true">Start Page</option>

                                @foreach( $pages as $page )
                                	<option value='{{ $page->id }}'>Pages {{ $page->page_number }}</option>
                                @endforeach	                           
	                        </select>


	                        <select id="end_page" class="form-control pl-15" name="end_page" placeholder="Create new PDF Chapter">
								<option disabled="true">End Page</option>
                                @foreach( $pages as $page )
                                	<option value='{{ $page->id }}'>Pages {{ $page->page_number }}</option>
                                @endforeach	 
	                        </select>

	                        <input type="text" name="chapter_name" class="form-control pl-15"  placeholder="Chapter Name">
	                        <input type="hidden" name="book_id" value="{{ $book->id }}">

                            <div class="col-6 col-offset-3 text-center">
                                <button type="submit" class="btn btn-info btn-block margin-top-10">{{ __('Create') }}</button>
                            </div>
	                    </div>
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
