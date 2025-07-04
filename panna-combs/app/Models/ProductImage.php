<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ProductImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'image_url',
        'display_order',
    ];

    protected $appends = ['full_image_url'];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function getFullImageUrlAttribute()
    {
        if (empty($this->image_url)) {
            return null;
        }
        
        // If it's already a full URL, return as is
        if (filter_var($this->image_url, FILTER_VALIDATE_URL)) {
            return $this->image_url;
        }
        
        // For Backblaze B2 storage, generate the URL
        return Storage::disk('backblaze')->url($this->image_url);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($image) {
            // Remove any Cloudinary-specific logic here
        });
    }
}
