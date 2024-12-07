<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LikesController extends Controller
{
    public function toggleLike(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'post_id' => 'required|exists:posts,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validated = $validator->validated();

        // Find or create a like entry
        $like = \App\Models\Like::firstOrCreate(
            [
                'user_id' => auth()->guard('api')->user()->id,
                'post_id' => $validated['post_id'],
            ],
            [
                'isLiked' => false, // Default value if not found
            ]
        );

        // Toggle the `isLiked` value
        $like->isLiked = !$like->isLiked;
        $like->save();

        return response()->json([
            'message' => 'Like status toggled successfully.',
            'isLiked' => $like->isLiked,
        ], 200);
    }

}
