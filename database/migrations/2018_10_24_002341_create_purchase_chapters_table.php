<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePurchaseChaptersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchase_chapters', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('book_id')->unsigned();
            $table->integer('chapter_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->integer('amount')->unsigned();
            $table->boolean('is_purchased');

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users') ;
            $table->foreign('book_id')->references('id')->on('books') ;
            $table->foreign('chapter_id')->references('id')->on('chapters') ;

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('purchase_chapters');
    }
}
