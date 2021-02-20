<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Post;
use App\Models\MovieShow;
use DateTime;

class MovieShowController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $date = new DateTime($request->date);
        // $date = new dateTime();
        // $date1 = $date->format('Y-m-d');
        return Post::collection(MovieShow::all());
        // return Post::collection(MovieShow::all()->where('start_day', $request->date));
        // return [$request->date];
        // $responce = MovieShow::all()->where('start_day', $date1);
        // return $responce;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // return $request->name;
        // $path = $request->file('poster');
        // return $path;
        // params.append('film_id', filmId);
        // params.append('hall_id', hallId);
        // params.append('start_time', start);
        // params.append('movie_show_duration', filmDuration);
        // params.append('start_day', date);
        // $image = $request->file('poster');
        // $imageName = time().'.'.$image->extension();
        // $image->move(public_path('images'),$imageName);
        // $path = 'images/'.$imageName;

        $newMovie = new MovieShow([
            'film_id' =>  $request->film_id,
            'hall_id' => $request->hall_id,
            'start_time' => $request->start_time,
            'movie_show_duration' => $request->movie_show_duration,
            'start_day' => $request->start_day,
            'film_name' => $request->name,
            'ordered' => '[]' 
        ]);

        $newMovie->save();

        // $image_path = 'images/1612891883.jpg';
        // if (File::exists($image_path)) {
        //     File::delete($image_path);
        //     // unlink($image_path);
        // }
        // $path = Storage::putFile('poster', $request->file('poster'));
        return 'New movie show added';
        // return $request->movie_show_duration;

        // return 'test';
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Post::collection(MovieShow::all()->where('start_day', $id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $newData = json_decode($request->dataArray);
        $deleted = json_decode($request->deleted);

        if(count($deleted) > 0) {
            // $arrForDelete = MovieShow::all()->where('start_day', $id);
            foreach($deleted as $item) {
                $targetItem = MovieShow::findOrFail($item);
                $targetItem->delete();
            }
        }

        if(count($newData) > 0) {
            foreach($newData as $newMovieShow) {
                $newMovie = new MovieShow([
                    'film_id' =>  $newMovieShow->film_id,
                    'hall_id' => $newMovieShow->hall_id,
                    'start_time' => $newMovieShow->start_time,
                    'movie_show_duration' => $newMovieShow->movie_show_duration,
                    'start_day' => $newMovieShow->start_day,
                    'film_name' => $newMovieShow->film_name,
                    'ordered' => '[]' 
                ]);
                $newMovie->save();
            }
        }

        return "Update successful";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
