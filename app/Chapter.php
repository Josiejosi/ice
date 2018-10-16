<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    public function book() {
    	return $this->belongsTo(User::class);
    }
}
