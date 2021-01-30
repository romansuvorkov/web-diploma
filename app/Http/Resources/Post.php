<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Post extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);

        // return [
        //     'id' => $this->id,
        //     'name' => $this->name,
        //     'description' => $this->description,
        //     'row' => $this->row,
        //     'seats' => $this->seats,
        //     'price' => $this->price,
        //     'vip_price' => $this->vip_price,
        //     'is_active' => $this->is_active,
        // ];
    }
}
