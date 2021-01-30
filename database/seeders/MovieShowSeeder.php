<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use DateTime;

class MovieShowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $date = new DateTime();
        $date_text = $date->format('Y-m-d H:i:s');

        DB::table('movie_show')->insert([
            'hall_id' => 1,
            'film_id' => 1,
            'start_time' => $date_text,
        ]);

        DB::table('movie_show')->insert([
            'hall_id' => 1,
            'film_id' => 2,
            'start_time' => $date_text,
        ]);

        DB::table('movie_show')->insert([
            'hall_id' => 2,
            'film_id' => 2,
            'start_time' => $date_text,
        ]);
    }
}
