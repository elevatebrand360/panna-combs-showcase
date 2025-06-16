import React from 'react';
import ProductGrid from './components/ProductGrid';
import CategoryFilter from './components/CategoryFilter';
import { useState } from 'react';

export default function App() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Panna Combs Showcase</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                    />
                    <ProductGrid categoryId={selectedCategory} />
                </div>
            </main>
        </div>
    );
} 