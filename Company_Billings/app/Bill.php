<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $table = 't_rechnungstermine';
    public $timestamps = false;
    public function companies()
    {
        return $this->belongsTo('App\Company', 'company_ID', 'id');
    }
}
