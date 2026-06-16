# JavaScript -> TypeScript

Ветка: `live/type-script-qa-2026-04`

Стартовая точка: `lesson/response-validation`

Формат истории:

- `docs: step N ...` - сначала инструкция;
- `code: step N ...` - затем готовое изменение;
- после `docs`-коммита можно выполнить команды самостоятельно и сравнить с следующим `code`-коммитом.

## Проверка стартового проекта

```bash
npm test -- --runTestsByPath test/unit.test.js test/discount.test.js
```

Ожидаемый результат:

```text
PASS test/unit.test.js
PASS test/discount.test.js
```

