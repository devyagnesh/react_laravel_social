<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostsController extends Controller
{
    public function fetchPosts()
    {
        $userId = auth()->guard('api')->user()->id;
        $posts = Posts::where('isDeleted', false)
            ->with([
                'likes' => function ($query) use ($userId) {
                    $query->when($userId, function ($q) use ($userId) {
                        $q->where('user_id', $userId)->select('post_id', 'isLiked');
                    });
                },
                'user' => function ($query) {
                    $query->select('id', 'profile_img', 'name');
                },
            ])
            ->withCount([
                'likes as total_likes' => function ($query) {
                    $query->where('isLiked', true);
                },
            ])
            ->orderBy('created_at', 'desc')
            ->get();

        $posts = $posts->map(function ($post) {
            $post->upload_time = Carbon::parse($post->created_at)->diffForHumans();
            return $post;
        });
        if (!$posts) {
            return response()->json(['status' => false, 'message' => 'no posts'], 404);
        }
        return response()->json(['status' => true, 'data' => $posts], 200);
    }

    public function createPost(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'introduction' => 'nullable|string',
            'paragraph' => 'nullable|array',
            'paragraph.*' => 'string',
            'images' => 'nullable|array',
            'images.*' => 'file|image|mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();
        $userId = auth()->guard('api')->user()->id;

        // Handle file uploads and store the image paths
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('images', 'public');
                $path = asset("storage/" . $path);
                $imagePaths[] = $path;
            }
        }

        Posts::create([
            'user_id' => $userId,
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'],
            'introduction' => $validated['introduction'] ?? null,
            'paragraph' => $validated['paragraph'] ?? [],
            'images' => $imagePaths,
            'isDeleted' => false,
        ]);

        return response()->json(['status' => true, 'message' => 'Post created successfully'], 201);
    }

    public function showPostDetail($id)
    {
        $currentUserId = auth()->guard('api')->user()->id;
        $post = Posts::where('id', '=', $id)
            ->with(['user:id,profile_img,name']) // Eager load user with specific fields
            ->withCount(['likes as totallikes']) // Count the total likes
            ->with(['likes' => function ($query) use ($currentUserId) {
                // Check if the current user has liked the post
                $query->where('user_id', $currentUserId);
            }])
            ->first();

        if (!$post) {
            return response()->json(['status' => false, 'message' => 'Post not found'], 404);
        }

        $post->upload_time = Carbon::parse($post->created_at)->diffForHumans();
        return response()->json(['status' => true, 'data' => $post], 200);
    }
}
