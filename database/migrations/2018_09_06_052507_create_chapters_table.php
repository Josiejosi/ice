<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateChaptersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chapters', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('file_name');
            $table->string('audio_url');
            $table->mediumText('raw_content');
            $table->mediumText('text_content');
            $table->mediumText('chapter_preview_content');
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
        Schema::dropIfExists('chapters');
    }
}
