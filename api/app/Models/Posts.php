<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Posts extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'subtitle',
        'introduction',
        'paragraph',
        'images',
        'isDeleted'];
    protected $casts = [
        'paragraph' => 'array',
        'images' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class, 'post_id');
    }
}
