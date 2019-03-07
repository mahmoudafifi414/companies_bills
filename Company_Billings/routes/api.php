<?php

//companies routes
Route::resource('companies', 'CompanyController');
//bill routes

//route to get bills
Route::get('bills/{numberPerPage?}', 'BillsController@getBillsOfCompanies');
//route to filter bill
Route::post('bills/filter', 'BillsController@filterBillsOfCompanies');
//route for get bill by id
Route::get('bill/{id}', 'BillsController@edit');
//route to update bill
Route::patch('bill/{id}', 'BillsController@update');
//route to delete bill
Route::delete('bills/{id}', 'BillsController@destroy');
