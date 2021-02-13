<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;
use App\Http\Resources\Post;
use Illuminate\Support\Facades\Storage;
use File;

class FilmController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Post::collection(Film::all());
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

        $image = $request->file('poster');
        $imageName = time().'.'.$image->extension();
        $image->move(public_path('images'),$imageName);
        $path = 'images/'.$imageName;

        $newFilm = new Film([
            'name' =>  $request->name,
            'description' => $request->description,
            'country' => $request->country,
            'duration' => $request->duration,
            'poster' => $path
        ]);
        $newFilm->save();

        // $image_path = 'images/1612891883.jpg';
        // if (File::exists($image_path)) {
        //     File::delete($image_path);
        //     // unlink($image_path);
        // }
        // $path = Storage::putFile('poster', $request->file('poster'));

        return 'New film added';

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
        return new Post(Film::findOrFail($id));
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
        //
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
