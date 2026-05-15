# 🚀 МТС Навигатор (MTS Progressors)

**МТС Навигатор** — это AI-driven платформа персонализированного обучения и карьерного роста для сотрудников экосистемы МТС. 
Система выступает в роли "Навигатора", который оценивает навыки "Пилота" (пользователя) и выстраивает динамический, адаптирующийся маршрут к его карьерной цели (Middle/Senior позиции).

Разработано в рамках хакатона МТС (МТС Прогрессоры).

## 🌟 Ключевые фичи
- **Адаптивный визуальный маршрут:** Обучение выглядит как интерактивная карта (GPS/метро).
- **AI-Ассистент:** Интегрированный ИИ анализирует успехи, проводит тесты и перестраивает маршрут в реальном времени.
- **Геймификация:** Статусы, очки прогресса и разблокировка новых возможностей (стажировки, вакансии) при прохождении узлов маршрута.

## 🛠 Технологический стек
- **Frontend:** React 19, Vite, Tailwind CSS v4, Framer Motion, TypeScript.
- **Backend:** Python, Flask, Gunicorn, ProxyAPI (OpenRouter / LLM Models).
- **Database:** PostgreSQL.
- **Infra:** Docker, Docker Compose, Nginx.

## ⚙️ Быстрый старт (Production / Docker)

Для запуска всего проекта одной командой (идеально для проверки жюри):

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/Breadstickhemmo/AIMTC.git
   cd AIMTC
   ```
2. Создайте файл `.env` в корне проекта на основе примера:
   ```bash
   cp .env.example .env
   ```
3. Добавьте ваш `PROXYAPI_KEY` в файл `.env`.
4. Запустите Docker Compose:
   ```bash
   docker-compose up --build -d
   ```
5. Откройте `http://localhost` в браузере.

## 👨‍💻 Локальная разработка (без Docker)

Если вы хотите разрабатывать компоненты отдельно:

**1. Настройка Backend (Flask):**
```bash
cd backend
python -m venv .venv
# Активация: Windows: .venv\Scripts\activate | Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
python app.py
```
*Сервер запустится на http://127.0.0.1:5000*

**2. Настройка Frontend (React/Vite):**
```bash
cd frontend
npm install
npm run dev
```
*Интерфейс запустится на http://localhost:5173 и будет проксировать /api на бэкенд.*

## 📂 Структура проекта
```text
AIMTC/
├── backend/               # Flask API, интеграция с LLM
├── frontend/              # React SPA, UI МТС Навигатор
├── docker-compose.yml     # Оркестрация контейнеров
├── .env.example           # Пример переменных окружения
└── README.md              # Документация проекта
```

## 👥 Команда
- **[Андрей]** — AI Integration / Team Lead
- **[Дмитрий]** — Fullstack
- **[Светлана]** — UI-UX
- **[Мария]** — Backend
- **[Илья]** — Frontend
- **[Богдан]** — Vibe