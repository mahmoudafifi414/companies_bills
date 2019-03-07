<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $table = 't_firmen';

    public function bills()
    {
        return $this->hasMany('App\Bill', 'company_ID', 'id');
    }
}
