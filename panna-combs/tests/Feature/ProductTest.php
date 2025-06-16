<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutMiddleware();
        
        // Mock Cloudinary facade
        Cloudinary::shouldReceive('upload')
            ->andReturn((object) [
                'getSecurePath' => fn() => 'https://res.cloudinary.com/test/image/upload/test.jpg'
            ]);
    }

    /** @test */
    public function it_validates_required_fields()
    {
        $response = $this->postJson('/admin/products', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'name',
                'product_code',
                'category_id',
                'description',
                'whatsapp_number',
                'email',
                'images',
            ]);
    }

    /** @test */
    public function it_validates_product_code_uniqueness()
    {
        $existingProduct = Product::factory()->create();
        
        $response = $this->postJson('/admin/products', [
            'name' => 'Test Product',
            'product_code' => $existingProduct->product_code,
            'category_id' => Category::factory()->create()->id,
            'description' => 'Test description',
            'whatsapp_number' => '+911234567890',
            'email' => 'test@example.com',
            'images' => [
                UploadedFile::fake()->image('test.jpg'),
            ],
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['product_code']);
    }

    /** @test */
    public function it_validates_whatsapp_number_format()
    {
        $response = $this->postJson('/admin/products', [
            'name' => 'Test Product',
            'product_code' => 'TEST123',
            'category_id' => Category::factory()->create()->id,
            'description' => 'Test description',
            'whatsapp_number' => 'invalid-number',
            'email' => 'test@example.com',
            'images' => [
                UploadedFile::fake()->image('test.jpg'),
            ],
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['whatsapp_number']);
    }

    /** @test */
    public function it_validates_email_format()
    {
        $response = $this->postJson('/admin/products', [
            'name' => 'Test Product',
            'product_code' => 'TEST123',
            'category_id' => Category::factory()->create()->id,
            'description' => 'Test description',
            'whatsapp_number' => '+911234567890',
            'email' => 'invalid-email',
            'images' => [
                UploadedFile::fake()->image('test.jpg'),
            ],
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function it_validates_image_file_types()
    {
        $response = $this->postJson('/admin/products', [
            'name' => 'Test Product',
            'product_code' => 'TEST123',
            'category_id' => Category::factory()->create()->id,
            'description' => 'Test description',
            'whatsapp_number' => '+911234567890',
            'email' => 'test@example.com',
            'images' => [
                UploadedFile::fake()->create('test.txt', 100),
            ],
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['images.0']);
    }

    /** @test */
    public function it_validates_image_count()
    {
        $response = $this->postJson('/admin/products', [
            'name' => 'Test Product',
            'product_code' => 'TEST123',
            'category_id' => Category::factory()->create()->id,
            'description' => 'Test description',
            'whatsapp_number' => '+911234567890',
            'email' => 'test@example.com',
            'images' => [
                UploadedFile::fake()->image('test1.jpg'),
                UploadedFile::fake()->image('test2.jpg'),
                UploadedFile::fake()->image('test3.jpg'),
                UploadedFile::fake()->image('test4.jpg'),
                UploadedFile::fake()->image('test5.jpg'),
            ],
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['images']);
    }

    /** @test */
    public function it_requires_at_least_one_image()
    {
        $response = $this->postJson('/admin/products', [
            'name' => 'Test Product',
            'product_code' => 'TEST123',
            'category_id' => Category::factory()->create()->id,
            'description' => 'Test description',
            'whatsapp_number' => '+911234567890',
            'email' => 'test@example.com',
            'images' => [],
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['images']);
    }

    /** @test */
    public function it_successfully_creates_product_with_valid_data()
    {
        $category = Category::factory()->create();
        
        $response = $this->postJson('/admin/products', [
            'name' => 'Test Product',
            'product_code' => 'TEST123',
            'category_id' => $category->id,
            'description' => 'Test description',
            'whatsapp_number' => '+911234567890',
            'email' => 'test@example.com',
            'images' => [
                UploadedFile::fake()->image('test1.jpg'),
                UploadedFile::fake()->image('test2.jpg'),
            ],
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'name',
                    'product_code',
                    'category_id',
                    'description',
                    'whatsapp_number',
                    'email',
                    'images' => [
                        '*' => [
                            'id',
                            'image_url',
                            'display_order',
                        ],
                    ],
                ],
            ]);

        $this->assertDatabaseHas('products', [
            'name' => 'Test Product',
            'product_code' => 'TEST123',
            'category_id' => $category->id,
        ]);

        $this->assertDatabaseCount('product_images', 2);
    }

    /** @test */
    public function it_validates_image_size()
    {
        $response = $this->postJson('/admin/products', [
            'name' => 'Test Product',
            'product_code' => 'TEST123',
            'category_id' => Category::factory()->create()->id,
            'description' => 'Test description',
            'whatsapp_number' => '+911234567890',
            'email' => 'test@example.com',
            'images' => [
                UploadedFile::fake()->image('test.jpg')->size(5121), // 5MB + 1KB
            ],
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['images.0']);
    }

    /** @test */
    public function it_handles_cloudinary_upload_failure()
    {
        // Mock Cloudinary to simulate upload failure
        $this->mock(\Cloudinary\Cloudinary::class, function ($mock) {
            $mock->shouldReceive('uploadApi->upload')
                ->andThrow(new \Exception('Upload failed'));
        });

        $response = $this->postJson('/admin/products', [
            'name' => 'Test Product',
            'product_code' => 'TEST123',
            'category_id' => Category::factory()->create()->id,
            'description' => 'Test description',
            'whatsapp_number' => '+911234567890',
            'email' => 'test@example.com',
            'images' => [
                UploadedFile::fake()->image('test.jpg'),
            ],
        ]);

        $response->assertStatus(500);
    }
} 