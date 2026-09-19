# Веритас

Production-quality frontend mock платформы предварительной оценки самочувствия на React, TypeScript и Vite. Backend и реальные медицинские/авторизационные сервисы отсутствуют: все ответы, профиль и демонстрационные результаты сохраняются локально в `localStorage`.

## Запуск

```bash
pnpm install
pnpm dev
pnpm test
pnpm build
```

Сборка использует `base: /VeraAI/` и HashRouter, поэтому совместима с GitHub Pages. Workflow: `.github/workflows/deploy-pages.yml`.

## Draft scope

Интерактивны экраны из draft Figma: login, dashboard, history, dynamics, profile, result detail, assessment start, consents, general info, symptoms 1/2, emotional state, lab choice, upload, OCR review и result/insufficient data. Дополнительные варианты вне draft при необходимости представлены как демо-состояния/disabled affordances.

Демо-вход: `anna@example.com` / `veritas2026`. Файл с именем `protected`, `unrecognized` или `partial` демонстрирует соответствующее OCR-состояние; поддерживаются PDF/JPG/PNG до 10 МБ.

## Источник дизайна

Интерфейс адаптирован по Figma draft file `G140r0rA9mslYSdyQCIa32` (platform canvas `125:4394`, login `126:4582`, dashboard `126:4652`, history `126:4827`, dynamics `126:4955`, profile `126:5085`, result `126:5191`, assessment screens `126:5661`–`126:7012`) и VeraAI Design System `gJX7a9tBFfVGxSvpRkD3s3`.
