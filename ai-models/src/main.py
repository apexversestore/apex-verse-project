from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
from typing import List, Dict
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Mock база товаров (позже заменишь на БД)
PRODUCTS_DB = [
    {
        "id": 1,
        "name": {"de": "Schwarze Jeans", "en": "Black Jeans", "uk": "Чорні джинси", "ru": "Черные джинсы"},
        "category": "jeans",
        "colors": ["black", "schwarz", "черный", "чорний"],
        "sizes": ["S", "M", "L", "XL", "XXL"],
        "description": {"de": "Perfekte schwarze Jeans für große Menschen",
                        "en": "Perfect black jeans for tall people"},
        "tags": ["tall", "hoch", "высокий", "високий", "slim", "modern"],
        "price": 89.99,
        "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
        "collection": "APEX.ALPHA"
    },
    {
        "id": 2,
        "name": {"de": "Premium Hoodie", "en": "Premium Hoodie", "uk": "Преміум худі", "ru": "Премиум худи"},
        "category": "hoodie",
        "colors": ["gray", "grau", "серый", "сірий", "black", "white"],
        "sizes": ["XS", "S", "M", "L", "XL"],
        "description": {"de": "Komfortables Premium Hoodie", "en": "Comfortable premium hoodie"},
        "tags": ["comfort", "bequem", "удобный", "зручний", "soft", "casual"],
        "price": 69.99,
        "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
        "collection": "APEX.BLISS"
    },
    {
        "id": 3,
        "name": {"de": "Elegantes Hemd", "en": "Elegant Shirt", "uk": "Елегантна сорочка", "ru": "Элегантная рубашка"},
        "category": "shirt",
        "colors": ["white", "weiß", "белый", "білий", "blue", "blau"],
        "sizes": ["S", "M", "L", "XL"],
        "description": {"de": "Business Hemd für jeden Anlass", "en": "Business shirt for any occasion"},
        "tags": ["business", "elegant", "formal", "офис", "office"],
        "price": 59.99,
        "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
        "collection": "APEX.ZENITH"
    }
]


class ApexSphereAI:
    def __init__(self):
        self.products = PRODUCTS_DB

    def extract_keywords(self, query: str) -> List[str]:
        """Извлекает ключевые слова из запроса"""
        # Приводим к нижнему регистру
        query = query.lower()

        # Убираем знаки препинания
        query = re.sub(r'[^\w\s]', ' ', query)

        # Разбиваем на слова
        words = query.split()

        # Фильтруем стоп-слова
        stop_words = {'der', 'die', 'das', 'ein', 'eine', 'und', 'oder', 'für', 'mit', 'ich', 'bin', 'suche',
                      'the', 'a', 'an', 'and', 'or', 'for', 'with', 'i', 'am', 'looking', 'search',
                      'я', 'ищу', 'для', 'с', 'и', 'или', 'що', 'шукаю'}

        keywords = [word for word in words if word not in stop_words and len(word) > 2]
        return keywords

    def calculate_match_score(self, product: Dict, keywords: List[str]) -> float:
        """Вычисляет совпадение продукта с запросом"""
        score = 0.0

        # Проверяем название (вес 3.0)
        for lang_name in product["name"].values():
            for keyword in keywords:
                if keyword in lang_name.lower():
                    score += 3.0

        # Проверяем категорию (вес 2.5)
        if any(keyword in product["category"] for keyword in keywords):
            score += 2.5

        # Проверяем цвета (вес 2.0)
        for color in product["colors"]:
            if any(keyword in color for keyword in keywords):
                score += 2.0

        # Проверяем теги (вес 1.5)
        for tag in product["tags"]:
            if any(keyword in tag for keyword in keywords):
                score += 1.5

        # Проверяем описание (вес 1.0)
        for desc in product["description"].values():
            for keyword in keywords:
                if keyword in desc.lower():
                    score += 1.0

        return score

    def search_products(self, query: str, limit: int = 5) -> List[Dict]:
        """Поиск продуктов по запросу"""
        keywords = self.extract_keywords(query)

        if not keywords:
            return []

        # Вычисляем score для каждого продукта
        scored_products = []
        for product in self.products:
            score = self.calculate_match_score(product, keywords)
            if score > 0:
                scored_products.append({
                    **product,
                    "match_score": score,
                    "match_keywords": keywords
                })

        # Сортируем по score и возвращаем топ результатов
        scored_products.sort(key=lambda x: x["match_score"], reverse=True)
        return scored_products[:limit]


# Инициализируем AI
ai = ApexSphereAI()


@app.route('/', methods=['GET'])
def health():
    return jsonify({
        "service": "APEX.SPHERE AI",
        "version": "1.0.0",
        "status": "running"
    })


@app.route('/ai/search', methods=['POST'])
def ai_search():
    try:
        data = request.get_json()
        query = data.get('query', '')
        language = data.get('language', 'de')

        if not query:
            return jsonify({"error": "Query is required"}), 400

        # Поиск продуктов
        results = ai.search_products(query)

        return jsonify({
            "query": query,
            "language": language,
            "results_count": len(results),
            "results": results,
            "suggestions": {
                "de": "Versuche spezifischere Begriffe wie 'schwarze Jeans für große Menschen'",
                "en": "Try more specific terms like 'black jeans for tall people'",
                "uk": "Спробуй більш конкретні терміни як 'чорні джинси для високих'",
                "ru": "Попробуй более конкретные термины как 'черные джинсы для высоких'"
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/ai/recommend', methods=['POST'])
def ai_recommend():
    """Рекомендации на основе предпочтений пользователя"""
    try:
        data = request.get_json()
        user_preferences = data.get('preferences', {})

        # Простой алгоритм рекомендаций
        recommendations = []
        for product in PRODUCTS_DB[:3]:  # Пока возвращаем топ 3
            recommendations.append({
                **product,
                "recommendation_reason": {
                    "de": f"Empfohlen basierend auf Ihren Präferenzen",
                    "en": f"Recommended based on your preferences",
                    "uk": f"Рекомендовано на основі ваших вподобань",
                    "ru": f"Рекомендовано на основе ваших предпочтений"
                },
                "confidence": 85 + (product["id"] * 3)  # Mock confidence
            })

        return jsonify({
            "recommendations": recommendations,
            "total": len(recommendations)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/ai/virtual-try', methods=['POST'])
def virtual_try():
    """Mock виртуальной примерки"""
    try:
        data = request.get_json()
        product_id = data.get('product_id')
        user_photo = data.get('user_photo', '')  # base64 или URL

        # Пока возвращаем mock результат
        return jsonify({
            "product_id": product_id,
            "try_on_result": {
                "success": True,
                "fit_score": 92,
                "preview_url": f"https://via.placeholder.com/400x600/3b82f6/white?text=Virtual+Try+Product+{product_id}",
                "recommendations": {
                    "size": "Рекомендуем размер M",
                    "fit": "Отлично подходит к вашей фигуре",
                    "style": "Этот стиль вам очень идет"
                }
            }
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('DEBUG', 'True').lower() == 'true'

    print(f"🤖 APEX.SPHERE AI starting on port {port}")
    print(f"🔍 Available endpoints:")
    print(f"   POST /ai/search - AI-powered product search")
    print(f"   POST /ai/recommend - Personal recommendations")
    print(f"   POST /ai/virtual-try - Virtual try-on")

    app.run(host='0.0.0.0', port=port, debug=debug)