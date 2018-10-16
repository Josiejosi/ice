<?php

use Illuminate\Database\Seeder;
use App\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
	    $role_employee = new Role();
	    $role_employee->name = 'student';
	    $role_employee->description = 'A student purchases and manage purchased books' ;
	    $role_employee->save();
	    $role_manager = new Role();
	    $role_manager->name = 'publisher';
	    $role_manager->description = 'Publisher manages and builds purchase content.' ;
	    $role_manager->save();
    }
}
