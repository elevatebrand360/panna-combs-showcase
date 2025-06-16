<?php

namespace App\Models;

use App\Traits\HasCloudinaryImages;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductImage extends Model
{
    use HasFactory, HasCloudinaryImages;

    protected $fillable = [
        'product_id',
        'image_url',
        'display_order',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($image) {
            $image->deleteImage($image->image_url);
        });
    }
}
