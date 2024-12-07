<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function getAlluser()
    {
        $users = User::where('id', '!=', auth()->guard('api')->user()->id)->get()->toArray();
        return response()->json(["status" => true, "data" => $users], 200);
    }

    /**
     * create a new account
     * @param \Illuminate\Http\Request $request
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function signUp(Request $request)
    {

        $profileImagePath = "";
        $validator = Validator::make($request->all(), [
            'profile_image' => 'required|image|mimes:png,jpg,jpeg',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()], 401);
        }

        if ($request->hasFile('profile_image')) {
            $profileImagePath = $request->file('profile_image')->store('avatars', 'public');
        }
        $user = User::create([
            'profile_img' => asset('storage/' . $profileImagePath),
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user', 'token'), 201);
    }

    /**
     * login with email and password
     * @param \Illuminate\Http\Request $request
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'error' => $validator->errors()], 401);
        }

        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
            $user = auth()->guard('api')->user();
            return response()->json(compact('token'));
        } catch (JWTException $e) {
            return response()->json(['status' => false, 'error' => 'Could not create token'], 500);
        }
    }

    /**
     * get profile data of current logged in user
     * @return mixed|\Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $myProfileData = auth()->guard('api')->user();

        if (!$myProfileData) {
            return response()->json(['status' => false, 'error' => 'unAuthorized request'], 403);
        }

        return response()->json(['status' => true, 'data' => $myProfileData], 200);
    }
}
