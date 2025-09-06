export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  productCode: string;
  slug: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: 1,
    name: "9\" Ladies Hair Comb",
    slug: "ladies-hair-comb",
    description: "Premium quality hair combs designed specifically for women's hair."
  },
  {
    id: 2,
    name: "9\" Ladies Designer Combs",
    slug: "ladies-fancy-combs",
    description: "Elegantly designed fancy combs for women with decorative elements."
  },
  {
    id: 3,
    name: "7\" Gents Combs",
    slug: "gents-combs",
    description: "Durable and strong combs designed for men's hair."
  },
  {
    id: 4,
    name: "5\" Gents Pocket Combs",
    slug: "gents-pocket-combs",
    description: "Compact pocket combs for men on the go."
  },
  {
    id: 5,
    name: "Anti Lice and Tooth Combs",
    slug: "anti-lice-tooth-combs",
    description: "Specialized combs for lice treatment and fine tooth combing."
  },
  {
    id: 6,
    name: "Family Pack",
    slug: "family-pack",
    description: "Value pack of various combs suitable for the whole family."
  },
  {
    id: 7,
    name: "Hair Combs",
    slug: "hair-combs",
    description: "Combination of brush and comb for versatile hair styling."
  },
  {
    id: 8,
    name: "Printed Combs",
    slug: "printed-combs",
    description: "Combs with custom printed designs and logos."
  },
  {
    id: 9,
    name: "Salon Combs",
    slug: "salon-combs",
    description: "Professional combs used by salons and hairstylists."
  },
  {
    id: 10,
    name: "Wooden Combs",
    slug: "wooden-combs",
    description: "Natural wooden combs that are gentle on the scalp and hair."
  },
  {
    id: 11,
    name: "Handmade Combs",
    slug: "handmade-combs",
    description: "Artisanal handcrafted combs made with traditional techniques."
  },
  {
    id: 12,
    name: "World of Colors",
    slug: "world-of-colors",
    description: "A vibrant collection of combs in a variety of colors."
  },
  {
    id: 13,
    name: "Panna Exclusive Combs",
    slug: "panna-exclusive-combs",
    description: "Exclusive range of premium combs by Panna."
  }
];

// Mock products - in a real application, these would come from a database
export const products: Product[] = [
  {
    id: 1,
    name: "Classic Ladies Hair Comb",
    description: "A classic 9-inch hair comb for everyday use, perfect for detangling and styling.",
    category: "9\" Ladies Hair Comb",
    image: "https://images.unsplash.com/photo-1599771334443-3048259bc702?q=80&w=1974&auto=format&fit=crop",
    productCode: "LC001",
    slug: "classic-ladies-hair-comb"
  },
  {
    id: 2,
    name: "Elegant Fancy Comb",
    description: "A decorative 9-inch fancy comb with elegant detailing for special occasions.",
    category: "9\" Ladies Designer Combs",
    image: "https://images.unsplash.com/photo-1622429499146-bc47772d8a52?q=80&w=1788&auto=format&fit=crop",
    productCode: "FC002",
    slug: "elegant-fancy-comb"
  },
  {
    id: 3,
    name: "Modern Stylish Comb",
    description: "A trendy 9-inch stylish comb with contemporary design for the fashion-forward woman.",
    category: "9\" Ladies Stylish Combs",
    image: "https://images.unsplash.com/photo-1590159763121-7c9fd312190d?q=80&w=2072&auto=format&fit=crop",
    productCode: "SC003",
    slug: "modern-stylish-comb"
  },
  {
    id: 4,
    name: "Salon Shampoo Comb",
    description: "A professional 9-inch shampoo comb designed for use in salons with wet hair.",
    category: "9\" Shampoo Combs",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop",
    productCode: "SH004",
    slug: "salon-shampoo-comb"
  },
  {
    id: 5,
    name: "Comfort Handle Comb",
    description: "A 9-inch ladies comb with an ergonomic handle for comfortable use.",
    category: "9\" Ladies Handle Combs",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop",
    productCode: "HC005",
    slug: "comfort-handle-comb"
  },
  {
    id: 6,
    name: "Classic Gents Comb",
    description: "A traditional 7-inch comb designed specifically for men's hair.",
    category: "7\" Gents Combs",
    image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?q=80&w=2069&auto=format&fit=crop",
    productCode: "GC006",
    slug: "classic-gents-comb"
  },
  {
    id: 7,
    name: "Premium Quality Comb",
    description: "A high-end 5-inch comb made with premium materials for superior durability.",
    category: "5\" Premium Combs",
    image: "https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=2070&auto=format&fit=crop",
    productCode: "PC007",
    slug: "premium-quality-comb"
  },
  {
    id: 8,
    name: "Gents Pocket Comb",
    description: "A compact 5-inch pocket comb for men to carry on the go.",
    category: "5\" Gents Pocket Combs",
    image: "https://images.unsplash.com/photo-1622288432450-277d0fef5ed9?q=80&w=2070&auto=format&fit=crop",
    productCode: "GP008",
    slug: "gents-pocket-comb"
  },
  {
    id: 9,
    name: "Fine Tooth Comb",
    description: "A specialized comb with fine teeth for lice treatment and detailed grooming.",
    category: "Anti Lice and Tooth Combs",
    image: "https://images.unsplash.com/photo-1622288432582-1ed04369a0c9?q=80&w=2070&auto=format&fit=crop",
    productCode: "FT009",
    slug: "fine-tooth-comb"
  },
  {
    id: 10,
    name: "International Export Comb",
    description: "A high-quality comb designed to international standards for export markets.",
    category: "Export Combs",
    image: "https://images.unsplash.com/photo-1633622453453-f6914e1eb2a0?q=80&w=2070&auto=format&fit=crop",
    productCode: "EX010",
    slug: "international-export-comb"
  },
  {
    id: 11,
    name: "Family Combo Pack",
    description: "A value pack containing various combs suitable for all family members.",
    category: "Family Pack",
    image: "https://images.unsplash.com/photo-1601612627005-84efec8de9c3?q=80&w=2070&auto=format&fit=crop",
    productCode: "FP011",
    slug: "family-combo-pack"
  },
  {
    id: 12,
    name: "Professional Salon Comb",
    description: "A professional-grade comb used by hairstylists in salons.",
    category: "Salon Combs",
    image: "https://images.unsplash.com/photo-1550103685-da83caf1f0c8?q=80&w=2070&auto=format&fit=crop",
    productCode: "PS012",
    slug: "professional-salon-comb"
  },
];

export const getProductsByCategory = (categorySlug: string) => {
  return products.filter(product => {
    const category = productCategories.find(cat => cat.name === product.category);
    return category?.slug === categorySlug;
  });
};

export const getProductBySlug = (slug: string) => {
  return products.find(product => product.slug === slug);
};

export const getCategoryBySlug = (slug: string) => {
  return productCategories.find(category => category.slug === slug);
};
