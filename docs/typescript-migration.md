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

## Шаг 1. Подключить TypeScript к Babel/Jest

Коммит с инструкцией: `docs: step 1 add babel typescript support`

Установить пакеты:

```bash
npm install --save-dev typescript @babel/preset-typescript typescript-eslint
```

Добавить preset в `babel.config.json`:

```json
{
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "22" } }],
    "@babel/preset-typescript"
  ]
}
```

Что изменится в `babel.config.json`:

- `@babel/preset-typescript` добавляется вторым preset;
- Babel сможет разобрать TypeScript-синтаксис и удалить типы перед запуском Jest;
- это не включает проверку типов, только трансформацию кода.

Что изменится в `eslint.config.mjs`:

```js
import tseslint from 'typescript-eslint'

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic
)
```

- `// @ts-check` включает проверку самого ESLint-конфига редактором и TypeScript language service;
- `typescript-eslint` добавляет правила ESLint для `.ts` файлов;
- `tseslint.config(...)` используется вместо обычного массива конфигов;
- `tseslint.configs.recommended` включает базовые TypeScript-правила;
- `tseslint.configs.stylistic` включает правила стиля для TypeScript;
- блок `files: ['**/*.js']` отключает type-aware правила для JavaScript-файлов, которые ещё не мигрировали.

Что изменится в `setup-jest.js`:

```js
import { matchers } from 'jest-json-schema'
```

- `require` заменяется на `import`;
- это проверяет, что Babel/Jest корректно обрабатывают ESM-синтаксис в setup-файле.

Что изменится в `src/api.js`:

```js
// eslint-disable-next-line @typescript-eslint/no-unused-vars
```

- старое правило `no-unused-vars` заменяется на TypeScript-версию;
- после подключения `typescript-eslint` именно `@typescript-eslint/no-unused-vars` отвечает за неиспользуемые переменные в TS-коде.

Переименовать один тест:

```bash
git mv test/unit.test.js test/unit.test.ts
```

Что изменится в `test/unit.test.ts`:

- файл переименуется из `.js` в `.ts`;
- обычные тесты останутся без изменений;
- добавится пример с TypeScript-аннотацией:

```ts
const value: number = '123'
```

- пример специально содержит неправильный тип, чтобы показать: Jest проходит, потому что Babel не проверяет типы.

Проверить запуск:

```bash
npm test -- --runTestsByPath test/unit.test.ts
```

Проверить, что Babel не проверяет типы:

```ts
const value: number = '123'
expect(value).toBe('123')
```

Ожидаемо: Jest может пройти, потому что Babel удаляет типы и запускает JavaScript.
