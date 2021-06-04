<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Yajra\DataTables\Facades\DataTables;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('modules.user.v_list-user');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function jsonDT()
    {
        $query = User::latest('id');
        return DataTables::of($query)->addIndexColumn()
        ->addColumn('action',fn($row) => view('modules.user.v_action-user',['model' => $row]))
        ->make(true);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [];
        $validator = Validator::make($request->all(),$rules);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors(),'message' => 'Masukkan data user dengan benar']);
        }
        $body = $request->all();
        $body['password'] = Hash::make($request->password);
        User::updateOrCreate(['id' => $body['id']],$body);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $row = User::find($id);
        return response()->json($row);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'Data user berhasil dihapus']);
    }
}
