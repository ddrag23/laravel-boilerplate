<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function index()
  {
    return view('modules.auth.login');
  }

  /**
   * cek authenticate
   *
   * @return void
   */
  public function authenticate(Request $request)
  {
    $request->validate([
      'username' => 'required',
      'password' => 'required'
    ]);
    $user = User::where('username',$request->username)->first();
    if ($user) {
      if (Auth::attempt(['username' => $request->username, 'password' => $request->password]) && Hash::check($request->password, $user->password)) {
        return redirect('/dashboard');
      }else{
        return redirect('/login')->with(['message' => 'Password yang anda masukkan salah']);
      }
    }else{
      return redirect('/login')->with(['message' => 'Username yang anda masukkan salah']);
    }
  }
}
