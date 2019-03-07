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
    public function getBillsOfCompanies($numberPerPage = 10)
    {
        $bills = Bill::with(array('companies' => function ($query) {
            $query->select('id', 'name', 'referenceNr');
        }))->select('id', 'date', 'amount', 'company_ID')
            ->orderBy('id', 'desc')->paginate($numberPerPage);
        return response()->json(['bills' => $bills], 200);
    }

    public function filterBillsOfCompanies(Request $request)
    {
        $searchQuery = '';
        if (isset($request->searchText) and $request->searchText != '') {
            $searchQuery = '%' . $request->searchText . '%';
        }
        $bills = Bill::with(array('companies' => function ($query) use ($request, $searchQuery) {
            if (strlen($searchQuery) > 0) {
                $query->select('id', 'name', 'referenceNr')->where('name', 'like', $searchQuery);
            } else {
                $query->select('id', 'name', 'referenceNr');
            }
        }))->select('id', 'date', 'amount', 'company_ID');
        if (isset($request->year) and $request->year != '') {
            $bills = $bills->whereYear('date', '=', $request->year);
        }
        if (isset($request->month) and $request->month != '') {
            $bills = $bills->whereMonth('date', '=', $request->month);
        }
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
    public function edit($id)
    {
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
    public function update(Request $request, $id)
    {
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
    public function destroy($id)
    {
        try {
            Bill::destroy($id);
        } catch (\Exception $exception) {
            return response()->json(['msg' => $exception, 'status' => 500], 500);
        }
        return response()->json(['msg' => 'Bill Deleted', 'id' => $id, 'status' => 200], 200);

    }
}
