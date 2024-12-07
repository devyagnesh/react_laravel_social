<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LikesController;
use App\Http\Controllers\PostsController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/signup', [AuthController::class, 'signUp']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(JwtMiddleware::class)->group(function () {
    Route::get('/users/all',[AuthController::class,'getAlluser']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/posts/create', [PostsController::class, 'createPost']);
    Route::get('/posts/all', [PostsController::class, 'fetchPosts']);
    Route::get('/posts/details/{postId}', [PostsController::class, 'showPostDetail']);
    Route::post('/like/toggle', [LikesController::class, 'toggleLike']);
});
