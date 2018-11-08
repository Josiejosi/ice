<?php

use Illuminate\Database\Seeder;

use App\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
	    $category 					= new Category() ;
	    $category->name 			= 'Agriculture' ;
	    $category->description 		= 'Agricultural Business, Agriculture Production, Animal Science...' ;
	    $category->save() ;

	    $category 					= new Category() ;
	    $category->name 			= 'Architecture' ;
	    $category->description 		= 'Architectural History, Architectural Technology, Environmental Design...' ;
	    $category->save() ;	

	    $category 					= new Category() ;
	    $category->name 			= 'Biological and Biomedical Sciences' ;
	    $category->description 		= 'Bioinformatics, Botany, Cellular Biology and Anatomical Sciences...' ;
	    $category->save() ; 
	
	    $category 					= new Category() ;
	    $category->name 			= 'Business' ;
	    $category->description 		= 'Accounting and Bookkeeping, Business Economics, Business Finance...' ;
	    $category->save() ;  
	
	    $category 					= new Category() ;
	    $category->name 			= 'Communications and Journalism' ;
	    $category->description 		= 'American Sign Language - ASL, Communication Studies, Communication Technology...' ;
	    $category->save() ; 
	
	    $category 					= new Category() ;
	    $category->name 			= 'Computer Sciences' ;
	    $category->description 		= 'Computer and Information Sciences, General, Computer Programming, Computer Systems Analysis...' ;
	    $category->save() ; 
	
	    $category 					= new Category() ;
	    $category->name 			= 'Culinary Arts and Personal Services' ;
	    $category->description 		= 'Cosmetology and Related Services, Culinary Arts and Culinary Services, Funeral Related Services...' ;
	    $category->save() ;
	
	    $category 					= new Category() ;
	    $category->name 			= 'Education' ;
	    $category->description 		= 'Counseling and Guidance, Curriculum and Instruction, Educational Administration and Supervision...' ;
	    $category->save() ;
	
	    $category 					= new Category() ;
	    $category->name 			= 'Engineering' ;
	    $category->description 		= 'Aeronautical and Astronautical Engineering, Biological and Agricultural Engineering, Biomedical and Medical Engineering...' ;
	    $category->save() ;
	
	    $category 					= new Category() ;
	    $category->name 			= 'Legal' ;
	    $category->description 		= 'Criminal Justice, Law Enforcement, and Corrections, Fire Safety and Protection, Legal Research and Professional Studies...' ;
	    $category->save() ;
	
	    $category 					= new Category() ;
	    $category->name 			= 'Liberal Arts and Humanities' ;
	    $category->description 		= 'Cultural Studies, Ethnic and Gender Studies, Geography and Cartography...' ;
	    $category->save() ;
	
	    $category 					= new Category() ;
	    $category->name 			= 'Mechanic and Repair Technologies' ;
	    $category->description 		= 'Construction Management and Trades, Electrical Repair and Maintenance, Heating, Air Conditioning, Ventilation, and Refrigeration Maintenance...' ;
	    $category->save() ;
	
	    $category 					= new Category() ;
	    $category->name 			= 'Medical and Health Professions' ;
	    $category->description 		= 'Alternative Medicine, Chiropractor, Clinical Laboratory Science Professions...' ;
	    $category->save() ;	
	
	    $category 					= new Category() ;
	    $category->name 			= 'Physical Sciences' ;
	    $category->description 		= 'Chemistry Sciences, Forestry and Wildlands Management, Natural Resources Conservation...' ;
	    $category->save() ; 
	
	    $category 					= new Category() ;
	    $category->name 			= 'Psychology' ;
	    $category->description 		= 'Developmental Psychology, Psychology and Human Behavior, School Psychology...' ;
	    $category->save() ;  
	
	    $category 					= new Category() ;
	    $category->name 			= 'Transportation and Distribution' ;
	    $category->description 		= 'Air Transportation and Distribution, Ground Transportation, Marine Transportation...' ;
	    $category->save() ;  
	
	    $category 					= new Category() ;
	    $category->name 			= 'Visual and Performing Arts' ;
	    $category->description 		= 'Dance, Design and Applied Arts, Drama and Theatre Arts...' ;
	    $category->save() ; 
    }
}
