@extends('layouts.ellumin')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">{{ $book->title }}</div>

                <div class="card-body">

                    <div class="col-12">
                        <div class="p-40 bg-white content-bottom h-p100">
                            <form action="{{ url('/create/chapter') }}/{{ $book->id }}" method="post" class="form-element">
                                @csrf
                                <div class="form-group">
                                        
                                    <select id="chapter_number" class="form-control pl-15" name="chapter_number" placeholder="Create new PDF Chapter">

                                        <?php 
                                            for ( $i=1; $i < 30; $i++ ) { 
                                                echo "<option value='$i'>Chapter $i</option>" ;
                                            }
                                        ?>

                                    </select>

                                </div>

                                    <div class="col-12 text-center">
                                      <button type="submit" class="btn btn-info btn-block margin-top-10">{{ __('Create') }}</button>
                                    </div>
					
            					<h3>Pages</h3>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Page</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        	<?php $page_num = 1 ; ?>
                                            @foreach( $pages as $page )

                                            <?php $content_html = preg_replace("/<img[^>]+\>/i", "(image) ", $page->raw_html )  ; ?>

                                            <tr>
                                                <td>

                                      <div class="checkbox">
                                        <input class="form-check-input" type="checkbox" name="page[]"  id="page{{ $page->id }}" value="{{ $page->id }}">
                                        <label for="page{{ $page->id }}">{{ __("Page $page_num") }}</label>
                                      </div>
                                                    
                                                </td>
                                                <td style="word-wrap: break-word">
                                                    <textarea class="form-control textwrapper" rows="10">{{ $content_html }}</textarea>
                                                </td>
                                            </tr>
                                            <?php $page_num++ ; ?>
                                            @endforeach

                                            <input type="hidden" name="number_of_pages" value="{{ $page_num }}">
                                            <input type="hidden" name="book_id" value="{{ $book->id }}">

                                        </tbody>
                                    </table>
                                </div>

                                <div class="col-12 text-center">
                                    <button type="submit" class="btn btn-info btn-block margin-top-10">{{ __('Create') }}</button>
                                </div>   
                            </form>
                        </td>
                    </tr>

                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('css')
    
@endsection
