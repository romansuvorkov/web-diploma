<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieShow extends Model
{
    use HasFactory;

    protected $fillable = [
        'hall_id',
        'film_id',
        'start_time'
    ];

    protected $table = 'movie_show';
}
