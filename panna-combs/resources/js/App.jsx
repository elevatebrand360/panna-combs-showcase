import './bootstrap';
import '../css/app.css';
import React, { useState } from 'react';
import ProductGrid from './components/ProductGrid';
import CategoryFilter from './components/CategoryFilter';

export default function App() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Panna Combs Showcase
                    </h1>
                    <p className="text-lg text-gray-600">
                        Discover our premium collection of combs and hair accessories
                    </p>
                </div>

                <CategoryFilter 
                    selectedCategory={selectedCategory} 
                    onCategoryChange={setSelectedCategory} 
                />

                <ProductGrid categoryId={selectedCategory} />
            </div>
        </div>
    );
} 