<?php

Route::resource('companies', 'CompanyController');
Route::get('bills/{numberPerPage?}', 'BillsController@getBillsOfCompanies');
Route::post('bills/filter', 'BillsController@filterBillsOfCompanies');
Route::get('bill/{id}', 'BillsController@edit');
Route::patch('bill/{id}', 'BillsController@update');
Route::delete('bills/{id}', 'BillsController@destroy');
