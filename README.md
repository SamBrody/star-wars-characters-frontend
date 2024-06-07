# Архитектура

За основу была взята методология FSD (Feature-Sliced Design), предназначенная для frontend-приложений. Она помогает сделать проект понятным и структурированным.

Для авторизации используется JWT токен, который хранится в localStorage

# Стек

React + TypeScript + Vite + bootstrap, react-hook-forms, tanstack/react-query, tanstack/react-router

# Запуск

По пути ``` src/shared/api/config ``` лежит файл index.ts с константой **API_URL**, значение этой констаны - адрес **star-wars-characters-backend**.
По умолчанию это значение равно ``` http://127.0.0.1:3105/v1 ```, то есть запущенный container в Docker. При необходимости этот адрес нужно поменять на свой.

Данные для авторизации:

Логин: ```admin```

Пароль: ```admin```
# 

