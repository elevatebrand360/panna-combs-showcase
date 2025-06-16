<?php

namespace App\Traits;

use Cloudinary\Cloudinary;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait HasCloudinaryImages
{
    public function uploadImage(UploadedFile $file): string
    {
        $cloudinary = app(Cloudinary::class);
        
        $result = $cloudinary->uploadApi()->upload(
            $file->getRealPath(),
            [
                'folder' => 'panna-combs/products',
                'resource_type' => 'image',
                'allowed_formats' => ['jpg', 'jpeg', 'png'],
            ]
        );

        return $result['secure_url'];
    }

    public function deleteImage(string $url): void
    {
        $cloudinary = app(Cloudinary::class);
        
        // Extract public_id from URL
        $publicId = basename(parse_url($url, PHP_URL_PATH), '.jpg');
        
        try {
            $cloudinary->uploadApi()->destroy($publicId);
        } catch (\Exception $e) {
            // Log error but don't throw
            \Log::error('Failed to delete Cloudinary image: ' . $e->getMessage());
        }
    }
} 