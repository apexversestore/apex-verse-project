// frontend/src/i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import de from './locales/de.json';
import en from './locales/en.json';
import uk from './locales/uk.json';
import ru from './locales/ru.json';

const resources = { de, en, uk, ru };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'de',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'apex-language',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;

// frontend/src/i18n/locales/de.json
{
  "brand": "APEX.VERSE",
  "navigation": {
    "catalog": "Katalog",
    "ai": "APEX.AI",
    "plus": "APEX.PLUS",
    "about": "Über uns",
    "login": "Anmelden",
    "register": "Registrieren",
    "cart": "Warenkorb",
    "profile": "Profil"
  },
  "hero": {
    "title": "Deine",
    "titleHighlight": "perfekte",
    "titleEnd": "Kleidung wartet",
    "subtitle": "APEX.VERSE löst das Problem der Suche nach perfekt sitzender Kleidung. 87% der Menschen verbringen 2+ Stunden und finden trotzdem nicht das Richtige. Wir ändern das mit KI.",
    "searchPlaceholder": "Beschreibe was du suchst: 'schwarze Jeans für große Menschen'",
    "searchButton": "Finden",
    "poweredBy": "Powered by APEX.SPHERE AI ✨"
  },
  "stats": {
    "time": "Ø Suchzeit",
    "timeValue": "2 Min",
    "accuracy": "Treffergenauigkeit",
    "accuracyValue": "95%",
    "combinations": "Style-Kombinationen",
    "combinationsValue": "∞"
  },
  "features": {
    "ai": {
      "title": "APEX.SPHERE KI",
      "desc": "Intelligente Kleidungsauswahl nach Beschreibung und Foto"
    },
    "plus": {
      "title": "APEX.PLUS",
      "desc": "Premium-Abo mit exklusiven Kollektionen"
    },
    "virtual": {
      "title": "Virtuelle Anprobe",
      "desc": "Probiere jedes Kleidungsstück von zu Hause aus"
    }
  },
  "common": {
    "loading": "Lädt...",
    "error": "Fehler aufgetreten",
    "retry": "Erneut versuchen",
    "save": "Speichern",
    "cancel": "Abbrechen",
    "close": "Schließen"
  }
}

// frontend/src/i18n/locales/en.json
{
  "brand": "APEX.VERSE",
  "navigation": {
    "catalog": "Catalog",
    "ai": "APEX.AI",
    "plus": "APEX.PLUS",
    "about": "About",
    "login": "Login",
    "register": "Sign Up",
    "cart": "Cart",
    "profile": "Profile"
  },
  "hero": {
    "title": "Your",
    "titleHighlight": "perfect",
    "titleEnd": "clothes await",
    "subtitle": "APEX.VERSE solves the problem of finding perfectly fitting clothes. 87% of people spend 2+ hours and still don't find what they need. We're changing that with AI.",
    "searchPlaceholder": "Describe what you're looking for: 'black jeans for tall people'",
    "searchButton": "Find",
    "poweredBy": "Powered by APEX.SPHERE AI ✨"
  },
  "stats": {
    "time": "Avg search time",
    "timeValue": "2 min",
    "accuracy": "Match accuracy",
    "accuracyValue": "95%",
    "combinations": "Style combinations",
    "combinationsValue": "∞"
  },
  "features": {
    "ai": {
      "title": "APEX.SPHERE AI",
      "desc": "Smart clothing selection by description and photo"
    },
    "plus": {
      "title": "APEX.PLUS",
      "desc": "Premium subscription with exclusive collections"
    },
    "virtual": {
      "title": "Virtual Try-On",
      "desc": "Try any item without leaving home"
    }
  },
  "common": {
    "loading": "Loading...",
    "error": "Error occurred",
    "retry": "Try again",
    "save": "Save",
    "cancel": "Cancel",
    "close": "Close"
  }
}

// frontend/src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, ShoppingBag, User, Menu, X, Sparkles } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: t('navigation.catalog'), href: '/catalog' },
    { name: t('navigation.ai'), href: '/ai-chat' },
    { name: t('navigation.plus'), href: '/plus' },
    { name: t('navigation.about'), href: '/about' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">{t('brand')}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Profile */}
            <Link 
              to="/profile"
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

// frontend/src/components/common/LanguageSwitcher.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' }
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    localStorage.setItem('apex-language', langCode);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{currentLang.flag}</span>
        <span className="hidden sm:inline text-sm">{currentLang.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[160px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  i18n.language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;

// frontend/src/components/common/LoadingSpinner.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LoadingSpinner = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
        <p className="text-white text-lg">{t('common.loading')}</p>
        <p className="text-blue-400 text-sm mt-2">APEX.VERSE</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

// frontend/src/pages/Home.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Sparkles, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAISearch = () => {
    // Здесь будет интеграция с APEX.SPHERE
    alert(`APEX.SPHERE: ${t('hero.searchButton')} "${searchQuery}"...`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Hero content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  {t('hero.title')}
                  <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    {" "}{t('hero.titleHighlight')}{" "}
                  </span>
                  {t('hero.titleEnd')}
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {t('hero.subtitle')}
                </p>
              </div>

              {/* AI Search Bar */}
              <div className="relative">
                <div className="flex items-center bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
                  <Sparkles className="w-6 h-6 text-blue-400 ml-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('hero.searchPlaceholder')}
                    className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-400 outline-none"
                  />
                  <button
                    onClick={handleAISearch}
                    className="bg-gradient-to-r from-blue-500 to-green-400 px-6 py-3 rounded-xl hover:from-blue-600 hover:to-green-500 transition-all duration-200 flex items-center space-x-2"
                  >
                    <span>{t('hero.searchButton')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2 ml-4">
                  {t('hero.poweredBy')}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{t('stats.timeValue')}</div>
                  <div className="text-sm text-gray-400">{t('stats.time')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{t('stats.accuracyValue')}</div>
                  <div className="text-sm text-gray-400">{t('stats.accuracy')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{t('stats.combinationsValue')}</div>
                  <div className="text-sm text-gray-400">{t('stats.combinations')}</div>
                </div>
              </div>
            </div>

            {/* Right side - AI Sphere */}
            <div className="relative">
              <div className="relative w-96 h-96 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-400/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-blue-500/30 to-green-400/30 rounded-full animate-ping"></div>
                <div className="absolute inset-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-12 h-12 mx-auto mb-2" />
                    <div className="text-lg font-bold">APEX.SPHERE</div>
                    <div className="text-sm opacity-80">AI Fashion Assistant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Sparkles className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">{t('features.ai.title')}</h3>
              <p className="text-gray-600">{t('features.ai.desc')}</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Star className="w-12 h-12 text-green-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">{t('features.plus.title')}</h3>
              <p className="text-gray-600">{t('features.plus.desc')}</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <ShoppingBag className="w-12 h-12 text-purple-500 mb-6" />
              <h3 className="text-xl font-bold mb-4">{t('features.virtual.title')}</h3>
              <p className="text-gray-600">{t('features.virtual.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to find your perfect style?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalog"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Catalog
            </Link>
            <Link
              to="/ai-chat"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Try AI Assistant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

// frontend/src/data/products.js
export const mockProducts = [
  {
    id: 1,
    name: {
      de: "Schwarze Slim-Fit Jeans",
      en: "Black Slim-Fit Jeans",
      uk: "Чорні джинси Slim-Fit",
      ru: "Черные джинсы Slim-Fit"
    },
    description: {
      de: "Perfekt sitzende schwarze Jeans für jeden Anlass",
      en: "Perfectly fitting black jeans for any occasion",
      uk: "Ідеально підхожі чорні джинси для будь-якого випадку",
      ru: "Идеально сидящие черные джинсы для любого случая"
    },
    price: 89.99,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["black", "blue", "gray"],
    category: "jeans",
    collection: "APEX.ALPHA",
    inStock: true,
    rating: 4.8,
    reviews: 127
  },
  {
    id: 2,
    name: {
      de: "Premium Hoodie",
      en: "Premium Hoodie",
      uk: "Преміум худі",
      ru: "Премиум худи"
    },
    description: {
      de: "Komfortables Hoodie aus Bio-Baumwolle",
      en: "Comfortable hoodie made from organic cotton",
      uk: "Комфортне худі з органічної бавовни",
      ru: "Удобная худи из органического хлопка"
    },
    price: 69.99,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["black", "white", "gray", "navy"],
    category: "hoodies",
    collection: "APEX.BLISS",
    inStock: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: {
      de: "Designer T-Shirt",
      en: "Designer T-Shirt",
      uk: "Дизайнерська футболка",
      ru: "Дизайнерская футболка"
    },
    description: {
      de: "Minimalistisches Design, maximaler Komfort",
      en: "Minimalist design, maximum comfort",
      uk: "Мінімалістичний дизайн, максимальний комфорт",
      ru: "Минималистичный дизайн, максимальный комфорт"
    },
    price: 29.99,
    currency: "EUR",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["white", "black", "gray", "navy", "red"],
    category: "t-shirts",
    collection: "APEX.ALPHA",
    inStock: true,
    rating: 4.7,
    reviews: 203
  }
];

export const mockCategories = [
  {
    id: "jeans",
    name: {
      de: "Jeans",
      en: "Jeans", 
      uk: "Джинси",
      ru: "Джинсы"
    },
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300"
  },
  {
    id: "hoodies",
    name: {
      de: "Hoodies",
      en: "Hoodies",
      uk: "Худі", 
      ru: "Худи"
    },
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300"
  },
  {
    id: "t-shirts",
    name: {
      de: "T-Shirts",
      en: "T-Shirts",
      uk: "Футболки",
      ru: "Футболки"
    },
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300"
  }
];

// frontend/src/utils/constants.js
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const SUPPORTED_LANGUAGES = ['de', 'en', 'uk', 'ru'];
export const DEFAULT_LANGUAGE = 'de';

export const APEX_COLLECTIONS = {
  ALPHA: 'APEX.ALPHA',
  ZENITH: 'APEX.ZENITH', 
  BLISS: 'APEX.BLISS',
  GRID: 'APEX.GRID',
  CHRONO: 'APEX.CHRONO',
  PULSE: 'APEX.PULSE',
  TRUE: 'APEX.TRUE'
};

export const CLOTHING_SIZES = {
  XS: 'XS',
  S: 'S', 
  M: 'M',
  L: 'L',
  XL: 'XL',
  XXL: 'XXL'
};

export const CURRENCY = {
  EUR: '€',
  USD: ',
  UAH: '₴',
  RUB: '₽'
};

// frontend/src/services/api.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor для добавления токенов
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('apex-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    const language = localStorage.getItem('apex-language') || 'de';
    config.headers['Accept-Language'] = language;
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('apex-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// API функции
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile')
};

export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  search: (query) => api.get('/products/search', { params: { q: query } }),
  getCategories: () => api.get('/products/categories')
};

export const aiAPI = {
  chat: (message) => api.post('/ai/chat', { message }),
  searchByDescription: (description) => api.post('/ai/search', { description }),
  virtualTryOn: (imageData, productId) => api.post('/ai/virtual-try-on', { 
    image: imageData, 
    productId 
  })
};

// backend/src/routes/products.js
const express = require('express');
const router = express.Router();

// Mock data (в будущем будет из базы данных)
const mockProducts = [
  {
    id: 1,
    name: {
      de: "Schwarze Slim-Fit Jeans",
      en: "Black Slim-Fit Jeans",
      uk: "Чорні джинси Slim-Fit",
      ru: "Черные джинсы Slim-Fit"
    },
    price: 89.99,
    currency: "EUR",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"],
    inStock: true
  }
];

// GET /api/products - Получить все товары
router.get('/', (req, res) => {
  try {
    const { category, size, color, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
    
    let filteredProducts = [...mockProducts];
    
    // Фильтрация
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Пагинация
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    res.json({
      products: paginatedProducts,
      total: filteredProducts.length,
      page: parseInt(page),
      totalPages: Math.ceil(filteredProducts.length / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// GET /api/products/:id - Получить товар по ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const product = mockProducts.find(p => p.id === parseInt(id));
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// POST /api/products/search - Поиск товаров
router.post('/search', (req, res) => {
  try {
    const { query, filters } = req.body;
    
    // Здесь будет интеграция с ИИ для умного поиска
    const results = mockProducts.filter(product => {
      const name = product.name.en.toLowerCase();
      return name.includes(query.toLowerCase());
    });
    
    res.json({
      query,
      results,
      total: results.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Search error', error: error.message });
  }
});

module.exports = router;