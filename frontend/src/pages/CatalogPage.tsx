import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, Filter, Grid, List, Star, ShoppingBag, Sparkles, SlidersHorizontal, X } from 'lucide-react'

interface Product {
  id: number
  name: { [key: string]: string }
  price: number
  salePrice?: number
  image: string
  collection: string
  category: string
  colors: string[]
  sizes: string[]
  rating: number
  inStock: boolean
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: { 
      de: "Schwarze Jeans", 
      en: "Black Jeans", 
      uk: "Чорні джинси", 
      ru: "Черные джинсы" 
    },
    price: 89.99,
    salePrice: 69.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
    collection: "APEX.ALPHA",
    category: "jeans",
    colors: ["black", "blue", "gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: { 
      de: "Premium Hoodie", 
      en: "Premium Hoodie", 
      uk: "Преміум худі", 
      ru: "Премиум худи" 
    },
    price: 79.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
    collection: "APEX.BLISS",
    category: "hoodie",
    colors: ["gray", "black", "white", "navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.9,
    inStock: true
  },
  {
    id: 3,
    name: { 
      de: "Elegantes Hemd", 
      en: "Elegant Shirt", 
      uk: "Елегантна сорочка", 
      ru: "Элегантная рубашка" 
    },
    price: 59.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop",
    collection: "APEX.ZENITH",
    category: "shirt",
    colors: ["white", "blue", "black"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.7,
    inStock: true
  },
  {
    id: 4,
    name: { 
      de: "Sport Shorts", 
      en: "Sport Shorts", 
      uk: "Спортивні шорти", 
      ru: "Спортивные шорты" 
    },
    price: 39.99,
    image: "https://images.unsplash.com/photo-1506629905565-bc45169748bb?w=500&h=600&fit=crop",
    collection: "APEX.PULSE",
    category: "shorts",
    colors: ["black", "gray", "navy"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    inStock: true
  },
  {
    id: 5,
    name: { 
      de: "Casual T-Shirt", 
      en: "Casual T-Shirt", 
      uk: "Casual футболка", 
      ru: "Casual футболка" 
    },
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
    collection: "APEX.ALPHA",
    category: "tshirt",
    colors: ["white", "black", "gray", "navy", "green"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    inStock: true
  },
  {
    id: 6,
    name: { 
      de: "Designer Jacke", 
      en: "Designer Jacket", 
      uk: "Дизайнерська куртка", 
      ru: "Дизайнерская куртка" 
    },
    price: 149.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop",
    collection: "APEX.ZENITH",
    category: "jacket",
    colors: ["black", "brown", "navy"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9,
    inStock: false
  }
]

const CatalogPage = () => {
  const { t, i18n } = useTranslation()
  const [products] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCollection, setSelectedCollection] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 200])

  const collections = ['all', 'APEX.ALPHA', 'APEX.BLISS', 'APEX.ZENITH', 'APEX.PULSE']
  const categories = ['all', 'jeans', 'hoodie', 'shirt', 'shorts', 'tshirt', 'jacket']

  useEffect(() => {
    let filtered = products

    // Поиск
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name[i18n.language]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.collection.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Фильтр по коллекции
    if (selectedCollection !== 'all') {
      filtered = filtered.filter(product => product.collection === selectedCollection)
    }

    // Фильтр по категории
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Фильтр по цене
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.price
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Сортировка
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        break
      case 'price-high':
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        filtered.sort((a, b) => a.name[i18n.language].localeCompare(b.name[i18n.language]))
        break
      default: // popular
        filtered.sort((a, b) => b.rating - a.rating)
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCollection, selectedCategory, sortBy, priceRange, i18n.language])

  const handleAISearch = () => {
    if (searchQuery.trim()) {
      alert(`🤖 APEX.SPHERE: Searching for "${searchQuery}"...`)
      // Здесь будет запрос к AI API
    }
  }

  const addToCart = (productId: number) => {
    alert(`Added product ${productId} to cart!`)
    // Здесь будет логика добавления в корзину
  }

  const ProductCard = ({ product }: { product: Product }) => {
    const currentPrice = product.salePrice || product.price
    const hasDiscount = !!product.salePrice

    return (
      <div className="glass-effect rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 group">
        <div className="relative">
          <img 
            src={product.image} 
            alt={product.name[i18n.language]}
            className="w-full h-64 object-cover"
          />
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
              -{Math.round((1 - (product.salePrice! / product.price)) * 100)}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold bg-red-600 px-4 py-2 rounded-lg">
                Ausverkauft
              </span>
            </div>
          )}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => addToCart(product.id)}
              disabled={!product.inStock}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors disabled:opacity-50"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-blue-400 font-medium">{product.collection}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-300">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
            {product.name[i18n.language]}
          </h3>
          
          <div className="flex items-center space-x-2 mb-3">
            {hasDiscount && (
              <span className="text-gray-400 line-through text-sm">€{product.price}</span>
            )}
            <span className="text-xl font-bold text-green-400">€{currentPrice}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-white/20"
                style={{ backgroundColor: color === 'white' ? '#f8f9fa' : color }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white">
                +{product.colors.length - 4}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1 text-xs">
            {product.sizes.map((size, index) => (
              <span key={index} className="bg-gray-700 px-2 py-1 rounded text-gray-300">
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gradient">Katalog</span>
            </h1>
            <p className="text-gray-300">
              Entdecke die perfekte Kleidung mit APEX.SPHERE AI
            </p>
          </div>
          
          {/* AI Search */}
          <div className="flex items-center glass-effect rounded-2xl p-2 max-w-md">
            <Sparkles className="w-6 h-6 text-blue-400 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="AI Suche: 'warme Jacke für Winter'"
              className="flex-1 bg-transparent px-4 py-2 text-white placeholder-gray-400 outline-none"
              onKeyPress={(e) => e.key === 'Enter' && handleAISearch()}
            />
            <button
              onClick={handleAISearch}
              className="bg-gradient-to-r from-blue-500 to-green-400 px-4 py-2 rounded-xl hover:from-blue-600 hover:to-green-500 transition-all duration-200"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center space-x-2 glass-effect px-4 py-2 rounded-lg"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filter</span>
          </button>

          {/* Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:flex lg:items-center lg:space-x-4 space-y-4 lg:space-y-0`}>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
            >
              <option value="all">Alle Kollektionen</option>
              {collections.slice(1).map(collection => (
                <option key={collection} value={collection}>{collection}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
            >
              <option value="all">Alle Kategorien</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
            >
              <option value="popular">Beliebtheit</option>
              <option value="price-low">Preis: Niedrig → Hoch</option>
              <option value="price-high">Preis: Hoch → Niedrig</option>
              <option value="rating">Bewertung</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* View Mode and Results */}
          <div className="lg:ml-auto flex items-center space-x-4">
            <span className="text-gray-400">
              {filteredProducts.length} Produkte
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">Keine Produkte gefunden</h3>
            <p className="text-gray-400 mb-6">
              Versuche andere Filter oder nutze die AI-Suche
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCollection('all')
                setSelectedCategory('all')
              }}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
            >
              Filter zurücksetzen
            </button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <button className="glass-effect px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-200">
              Mehr laden
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CatalogPage