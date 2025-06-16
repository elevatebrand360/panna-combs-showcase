import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function ProductCard({ product }) {
    const [isOpen, setIsOpen] = useState(false);

    const whatsappMessage = `Hi, I'm interested in ${product.name}`;
    const whatsappUrl = `https://wa.me/${product.whatsapp_number}?text=${encodeURIComponent(whatsappMessage)}`;
    const mailtoUrl = `mailto:${product.email}?subject=Inquiry about ${encodeURIComponent(product.name)}`;

    return (
        <>
            <div
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => setIsOpen(true)}
            >
                <div className="aspect-square relative">
                    {product.images.length > 0 ? (
                        <img
                            src={product.images[0].image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-400">No image</span>
                        </div>
                    )}
                    {product.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                            +{product.images.length - 1} more
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500">Code: {product.product_code}</p>
                </div>
            </div>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
                        <div className="flex justify-between items-start mb-4">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                                Contact Information
                            </Dialog.Title>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Product</h4>
                                <p className="mt-1 text-sm text-gray-900">{product.name}</p>
                                <p className="text-sm text-gray-500">Code: {product.product_code}</p>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Contact Options</h4>
                                <div className="mt-2 space-y-2">
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
                                    >
                                        Message on WhatsApp
                                    </a>
                                    <a
                                        href={mailtoUrl}
                                        className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        Send Email
                                    </a>
                                </div>
                            </div>

                            {product.description && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Description</h4>
                                    <p className="mt-1 text-sm text-gray-900">{product.description}</p>
                                </div>
                            )}
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
} 