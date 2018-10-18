<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTempPagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('temp_pages', function (Blueprint $table) {
            $table->increments('id');
            $table->longText('raw_html');
            $table->longText('raw_css');
            $table->integer('page_number') ;
            $table->integer('book_id')->unsigned();
            $table->timestamps();
            
            $table->foreign('book_id')->references('id')->on('books') ;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('temp_pages');
    }
}
