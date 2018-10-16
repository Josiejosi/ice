let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js')
	.js([
		'resources/assets/js/jquery.slimscroll.js', 
		'resources/assets/js/fastclick.js', 
		'resources/assets/js/template.js', 
	], 'public/js/ellumin.js')
   .styles([
   		'resources/assets/css/bootstrap.css',
   		'resources/assets/css/bootstrap-extend.css',
   		'resources/assets/css/master_style_dark.css',
   		'resources/assets/css/master_style_rtl.css',
   		'resources/assets/css/master_style.css',
   		'resources/assets/css/_all-skins.css',
   	], 'public/css/ellumin.css')
   .styles([
   		'resources/assets/css/fonts/animate.css',
   		//'resources/assets/css/fonts/cryptocoins.css',
   		//'resources/assets/css/fonts/flag-icons.css',
   		'resources/assets/css/fonts/font-awesome.css',
   		'resources/assets/css/fonts/ionicons.css',
   		'resources/assets/css/fonts/linea.css',
   		'resources/assets/css/fonts/materialdesignicons.css',
   		'resources/assets/css/fonts/simple-line-icons.css',
   		'resources/assets/css/fonts/themify-icons.css',
   	], 'public/css/icons.css')
   	 ;
