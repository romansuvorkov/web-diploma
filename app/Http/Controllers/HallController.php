<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Post;
use App\Models\Hall;
use App\Models\Seat;
use App\Models\MovieShow;

class HallController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Post::collection(Hall::all());
        // return Hall::all();

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new Post(Hall::findOrFail($id));
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
        $hall = Hall::findOrFail($id);
        $hall->price = $request->price;
        $hall->vip_price = $request->vip_price;
        $hall->save();
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
        $hall = Hall::findOrFail($id);
        if($hall) {
            $seatsArr = Seat::all()->where('hall_id', $id);
            foreach($seatsArr as $seat) {
                $seat->delete();
            }

            $movieShowArr = MovieShow::all()->where('hall_id', $id);
            foreach($movieShowArr as $movie) {
                $movie->delete();
            } 
            $hall->delete(); 
        }

        return "Successful delete";

    }
}
