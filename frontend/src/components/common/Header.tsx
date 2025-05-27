import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, ShoppingBag, Sparkles } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  const { t } = useTranslation()

  return (
    <header className="flex items-center justify-between p-6 backdrop-blur-sm bg-white/10">
      <Link to="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-400 rounded-full flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold">{t('brand')}</span>
      </Link>
      
      <nav className="hidden md:flex space-x-8">
        <Link to="/catalog" className="hover:text-blue-400 transition-colors">
          {t('navigation.catalog')}
        </Link>
        <Link to="/ai" className="hover:text-blue-400 transition-colors">
          {t('navigation.ai')}
        </Link>
        <Link to="/plus" className="hover:text-blue-400 transition-colors">
          {t('navigation.plus')}
        </Link>
        <Link to="/about" className="hover:text-blue-400 transition-colors">
          {t('navigation.about')}
        </Link>
      </nav>
      
      <div className="flex items-center space-x-4">
        <Search className="w-6 h-6 cursor-pointer hover:text-blue-400" />
        <Link to="/cart">
          <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-blue-400" />
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  )
}

export default Header