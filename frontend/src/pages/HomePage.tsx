import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, ShoppingBag, Sparkles, ArrowRight, Star, Globe, ChevronDown } from 'lucide-react'
import LanguageSwitcher from '../components/common/LanguageSwitcher'

function App() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')

  const handleAISearch = () => {
    alert(`APEX.SPHERE: ${t('hero.searchButton')} "${searchQuery}"...`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 backdrop-blur-sm bg-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">{t('brand')}</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="hover:text-blue-400 transition-colors">{t('navigation.catalog')}</a>
          <a href="#" className="hover:text-blue-400 transition-colors">{t('navigation.ai')}</a>
          <a href="#" className="hover:text-blue-400 transition-colors">{t('navigation.plus')}</a>
          <a href="#" className="hover:text-blue-400 transition-colors">{t('navigation.about')}</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6 cursor-pointer hover:text-blue-400" />
          <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-blue-400" />
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Hero */}
      <main className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                {t('hero.title')}
                <span className="text-gradient">
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
              <div className="flex items-center glass-effect rounded-2xl p-2">
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
                <div className="text-3xl font-bold text-purple-400">∞</div>
                <div className="text-sm text-gray-400">{t('stats.combinations')}</div>
              </div>
            </div>
          </div>

          {/* Right side - AI Sphere */}
          <div className="relative">
            <div className="relative w-96 h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-400/20 rounded-full animate-pulse"></div>
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

        {/* Features preview */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="glass-effect rounded-2xl p-6">
            <Sparkles className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">{t('features.ai.title')}</h3>
            <p className="text-gray-400">{t('features.ai.desc')}</p>
          </div>
          
          <div className="glass-effect rounded-2xl p-6">
            <Star className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">{t('features.plus.title')}</h3>
            <p className="text-gray-400">{t('features.plus.desc')}</p>
          </div>
          
          <div className="glass-effect rounded-2xl p-6">
            <ShoppingBag className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">{t('features.virtual.title')}</h3>
            <p className="text-gray-400">{t('features.virtual.desc')}</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App