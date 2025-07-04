-- Create categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT categories_name_length CHECK (char_length(name) >= 3),
    CONSTRAINT categories_slug_length CHECK (char_length(slug) >= 3)
);

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    product_code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    category_id INTEGER NOT NULL,
    whatsapp_number VARCHAR(20),
    contact_person VARCHAR(100),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT,
    CONSTRAINT products_name_length CHECK (char_length(name) >= 3),
    CONSTRAINT products_product_code_length CHECK (char_length(product_code) >= 3),
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_whatsapp CHECK (whatsapp_number ~* '^\+?[0-9]{10,15}$')
);

-- Create product_images table
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,
    CONSTRAINT valid_image_url CHECK (image_url ~* '\.(jpg|jpeg|png)$'),
    CONSTRAINT display_order_range CHECK (display_order BETWEEN 1 AND 4)
);

-- Create index for faster lookups
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_products_product_code ON products(product_code);

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to check product image count
CREATE OR REPLACE FUNCTION check_product_image_count()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM product_images WHERE product_id = NEW.product_id) > 4 THEN
        RAISE EXCEPTION 'A product cannot have more than 4 images';
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for product image count
CREATE TRIGGER check_product_image_count_trigger
    BEFORE INSERT ON product_images
    FOR EACH ROW
    EXECUTE FUNCTION check_product_image_count();

-- Add comments
COMMENT ON TABLE categories IS 'Stores product categories with their details';
COMMENT ON TABLE products IS 'Stores product information with category relationships';
COMMENT ON TABLE product_images IS 'Stores product images with a maximum of 4 images per product';
COMMENT ON COLUMN categories.slug IS 'URL-friendly version of the category name';
COMMENT ON COLUMN products.product_code IS 'Unique identifier code for the product';
COMMENT ON COLUMN product_images.display_order IS 'Order in which images should be displayed (1-4)';

-- Insert a category
INSERT INTO categories (name, slug, description) 
VALUES ('Ladies Hair Combs', 'ladies-hair-combs', 'Premium quality hair combs for women');

-- Insert a product
INSERT INTO products (name, product_code, description, category_id, whatsapp_number, contact_person, email)
VALUES ('Classic Ladies Comb', 'LC001', 'A classic 9-inch hair comb', 1, '+1234567890', 'John Doe', 'john@example.com');

-- Insert product images
INSERT INTO product_images (product_id, image_url, display_order)
VALUES (1, 'https://firebasestorage.googleapis.com/v0/b/your-bucket/o/images%2Ffilename.jpg?alt=media&token=...', 1);
