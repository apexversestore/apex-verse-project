-- APEX.VERSE Database Schema
-- Для PostgreSQL/MySQL

-- Пользователи
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    preferred_language VARCHAR(5) DEFAULT 'de',
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    apex_plus_subscriber BOOLEAN DEFAULT false,
    apex_score_points INTEGER DEFAULT 0
);

-- Категории товаров
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name_de VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_uk VARCHAR(100) NOT NULL,
    name_ru VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    parent_id INTEGER REFERENCES categories(id),
    is_active BOOLEAN DEFAULT true
);

-- Коллекции APEX
CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL, -- APEX.ALPHA, APEX.ZENITH, etc.
    title_de VARCHAR(100) NOT NULL,
    title_en VARCHAR(100) NOT NULL,
    title_uk VARCHAR(100) NOT NULL,
    title_ru VARCHAR(100) NOT NULL,
    description_de TEXT,
    description_en TEXT,
    description_uk TEXT,
    description_ru TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Товары
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name_de VARCHAR(200) NOT NULL,
    name_en VARCHAR(200) NOT NULL,
    name_uk VARCHAR(200) NOT NULL,
    name_ru VARCHAR(200) NOT NULL,
    description_de TEXT,
    description_en TEXT,
    description_uk TEXT,
    description_ru TEXT,
    category_id INTEGER REFERENCES categories(id),
    collection_id INTEGER REFERENCES collections(id),
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'EUR',
    is_active BOOLEAN DEFAULT true,
    stock_quantity INTEGER DEFAULT 0,
    min_stock_level INTEGER DEFAULT 5,
    weight_kg DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Размеры товаров
CREATE TABLE product_sizes (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    size_name VARCHAR(10) NOT NULL, -- XS, S, M, L, XL, XXL
    size_type VARCHAR(20) DEFAULT 'standard', -- standard, tall, short, plus
    chest_cm INTEGER,
    waist_cm INTEGER,
    hips_cm INTEGER,
    length_cm INTEGER,
    stock_quantity INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT true
);

-- Цвета товаров
CREATE TABLE product_colors (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    color_name_de VARCHAR(50) NOT NULL,
    color_name_en VARCHAR(50) NOT NULL,
    color_name_uk VARCHAR(50) NOT NULL,
    color_name_ru VARCHAR(50) NOT NULL,
    hex_code VARCHAR(7), -- #FFFFFF
    is_available BOOLEAN DEFAULT true
);

-- Изображения товаров
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(200),
    is_primary BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0
);

-- Теги для ИИ поиска
CREATE TABLE product_tags (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    tag_name VARCHAR(100) NOT NULL,
    tag_language VARCHAR(5) NOT NULL, -- de, en, uk, ru
    tag_type VARCHAR(50) DEFAULT 'style', -- style, fit, occasion, material
    ai_weight DECIMAL(3,2) DEFAULT 1.0 -- Вес для AI поиска
);

-- Корзина пользователя
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    size_id INTEGER REFERENCES product_sizes(id),
    color_id INTEGER REFERENCES product_colors(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Заказы
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, shipped, delivered, cancelled
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    shipping_address_line1 VARCHAR(200),
    shipping_address_line2 VARCHAR(200),
    shipping_city VARCHAR(100),
    shipping_postal_code VARCHAR(20),
    shipping_country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Элементы заказа
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    size_id INTEGER REFERENCES product_sizes(id),
    color_id INTEGER REFERENCES product_colors(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
);

-- ИИ взаимодействия (для обучения)
CREATE TABLE ai_interactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    session_id VARCHAR(100),
    interaction_type VARCHAR(50), -- search, recommendation, virtual_try
    query_text TEXT,
    query_language VARCHAR(5),
    results_shown INTEGER,
    clicked_product_id INTEGER REFERENCES products(id),
    interaction_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_feedback INTEGER, -- 1-5 rating
    conversion_completed BOOLEAN DEFAULT false
);

-- APEX.SCORE история
CREATE TABLE score_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    points_change INTEGER NOT NULL, -- может быть отрицательным
    reason VARCHAR(100) NOT NULL, -- purchase, referral, review, etc.
    related_order_id INTEGER REFERENCES orders(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- APEX.PLUS подписки
CREATE TABLE apex_plus_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    subscription_type VARCHAR(50) DEFAULT 'monthly', -- monthly, yearly
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    auto_renew BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для производительности
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_collection ON products(collection_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_product_tags_name ON product_tags(tag_name);
CREATE INDEX idx_ai_interactions_user ON ai_interactions(user_id);
CREATE INDEX idx_ai_interactions_type ON ai_interactions(interaction_type);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Комментарии для документации
COMMENT ON TABLE products IS 'Основная таблица товаров APEX.VERSE';
COMMENT ON TABLE ai_interactions IS 'Логирование взаимодействий с APEX.SPHERE для ML';
COMMENT ON COLUMN product_tags.ai_weight IS 'Вес тега для AI поиска (0.1-2.0)';
COMMENT ON TABLE apex_plus_subscriptions IS 'APEX.PLUS премиум подписки';