<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    //surname, age, cell_phone_number, gender, province, type_of_study, institution, field_of_study

    public function up()
    {
        Schema::create('user_details', function (Blueprint $table) {
            $table->increments('id');
            $table->string('surname');
            $table->string('age');
            $table->string('cell_phone_number');
            $table->string('gender');
            $table->string('province');
            $table->string('type_of_study');
            $table->string('institution');
            $table->string('field_of_study');

            $table->integer('user_id')->unsigned();

            $table->foreign('user_id')->references('id')->on('users') ;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_details');
    }
}
