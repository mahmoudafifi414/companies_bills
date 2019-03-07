<?php

namespace App\Http\Controllers;

use App\Bill;
use Illuminate\Http\Request;

class BillsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    //this is the function to git bills in the companies and make use of pagination of it with number
    public function getBillsOfCompanies($numberPerPage = 10)
    {
        //get bills with companies relation
        $bills = Bill::with(array('companies' => function ($query) {
            $query->select('id', 'name', 'referenceNr');
        }))->select('id', 'date', 'amount', 'company_ID')
            ->orderBy('id', 'desc')->paginate($numberPerPage);
        return response()->json(['bills' => $bills], 200);
    }

    //this is the function to filter bills of companies with search input or all or date
    public function filterBillsOfCompanies(Request $request)
    {
        //check if the search input is supplied and not empty
        $searchQuery = '';
        if (isset($request->searchText) and $request->searchText != '') {
            $searchQuery = '%' . $request->searchText . '%';
        }
        //get the bills with companies
        $bills = Bill::with(array('companies' => function ($query) use ($request, $searchQuery) {
            if (strlen($searchQuery) > 0) {
                $query->select('id', 'name', 'referenceNr')->where('name', 'like', $searchQuery);
            } else {
                $query->select('id', 'name', 'referenceNr');
            }
        }))->select('id', 'date', 'amount', 'company_ID');
        //if there is year in filter so filter the year of bills
        if (isset($request->year) and $request->year != '') {
            $bills = $bills->whereYear('date', '=', $request->year);
        }
        //if there is year in filter so filter the month of bills
        if (isset($request->month) and $request->month != '') {
            $bills = $bills->whereMonth('date', '=', $request->month);
        }
        //order the bills and get them
        $bills = $bills->orderBy('id', 'desc')->paginate(10);
        return response()->json(['bills' => $bills], 200);
    }

    public function index()
    {

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
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    //function to store bills
    public static function store($bills, $companyId)
    {
        foreach ($bills as $bill) {
            $billInstance = new Bill;
            $billInstance->company_ID = $companyId;
            $billInstance->date = $bill['dateOfBill'];
            $billInstance->amount = $bill['amount'];
            $billInstance->billNumber = $bill['billNo'];
            $billInstance->save();
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    //function to get data of bill to edit it
    public function edit($id)
    {
        //get bill data
        try {
            $billData = Bill::select('id', 'date', 'amount', 'billNumber')->find($id);
        } catch (\Exception $exception) {
            return response()->json(['msg' => 'Error Happened'], 500);
        }
        return response()->json(['data' => $billData], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    //function to update the bill
    public function update(Request $request, $id)
    {
        //get data and update the data which is not null
        try {
            $bill = Bill::find($id);
            $request->amount != null ? $bill->amount = $request->amount : $bill->amount;
            $request->billNumber != null ? $bill->billNumber = $request->billNumber : $bill->billNumber;
            $request->date != null ? $bill->date = $request->date : $bill->date;
            $bill->update();
        } catch (\Exception $exception) {
            return response()->json(['msg' => $exception], 500);
        }
        return response()->json(['data' => 'updated Successfully', $bill], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    //function to delete bill
    public function destroy($id)
    {
        try {
            Bill::destroy($id);
        } catch (\Exception $exception) {
            return response()->json(['msg' => 'error happened', 'status' => 500], 500);
        }
        return response()->json(['msg' => 'Bill Deleted', 'id' => $id, 'status' => 200], 200);

    }
}
