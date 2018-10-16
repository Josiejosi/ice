<?php

use Illuminate\Database\Seeder;

use App\User;
use App\Role;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {

	    $role_student 			= Role::where('name', 'student')->first() ;
	    $role_publisher  		= Role::where('name', 'publisher')->first() ;

	    $employee 				= new User() ;
	    $employee->name 		= 'Jacob Mashamitshk' ;
	    $employee->email 		= 'jakop@gmail.com' ;
	    $employee->password 	= bcrypt( 'jakop@gmail.com' ) ;
	    $employee->save();
	    $employee->roles()->attach( $role_student ) ;

	    $manager 				= new User() ;
	    $manager->name 			= 'Samuel Makane' ;
	    $manager->email 		= 'sam@gmail.com' ;
	    $manager->password 		= bcrypt('sam@gmail.com') ;
	    $manager->save() ;
	    $manager->roles()->attach($role_publisher) ;
	    
    }
}
