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

После кодового коммита шага 1:

```bash
npm test -- --runTestsByPath test/unit.test.ts
```

Результат:

```text
PASS test/unit.test.ts
```

## Шаг 2. Добавить проверку типов через tsc

Коммит с инструкцией: `docs: step 2 add type check`

Установить TypeScript уже было нужно на шаге 1. Теперь добавить `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node", "jest"]
  },
  "include": ["src/**/*.ts", "framework/**/*.ts", "test/**/*.ts"]
}
```

Значения свойств:

| Свойство | Значение | Назначение |
| --- | --- | --- |
| `target` | `ES2022` | Проверять код как современный JavaScript для Node.js. |
| `module` | `CommonJS` | Использовать формат модулей, совместимый с текущим Jest-запуском. |
| `moduleResolution` | `Node` | Искать импорты по правилам Node.js. |
| `strict` | `true` | Включить строгую проверку типов. |
| `noEmit` | `true` | Не создавать `.js` файлы, только проверять типы. |
| `esModuleInterop` | `true` | Упростить импорт CommonJS-пакетов через `import`. |
| `skipLibCheck` | `true` | Не проверять типы внутри зависимостей. |
| `types` | `node`, `jest` | Подключить глобальные типы Node.js и Jest. |
| `include` | `src`, `framework`, `test` | Ограничить проверку файлами проекта. |

Добавить скрипт:

```json
{
  "scripts": {
    "type-check": "tsc --noEmit"
  }
}
```

Запустить:

```bash
npm run type-check
```

Ожидаемо: проверка падает на строке `const value: number = '123'`.

После кодового коммита шага 2:

```bash
npm run type-check
```

Результат:

```text
test/unit.test.ts: Could not find a declaration file for module '../src/modules.js'.
test/unit.test.ts: Type 'string' is not assignable to type 'number'.
```

## Шаг 3. Исправить первые ошибки type-check

Коммит с инструкцией: `docs: step 3 fix first type errors`

Переименовать импортируемый файл:

```bash
git mv src/modules.js src/modules.ts
```

Обновить импорт в тесте:

```ts
import { greet, farewell } from '../src/modules'
```

Исправить неправильный тип:

```ts
const value: number = 123
expect(value).toBe(123)
```

Добавить типы параметров в `src/modules.ts`:

```ts
export function greet(name: string): string
export const farewell = (name: string): string
```

Запустить:

```bash
npm run type-check
npm test -- --runTestsByPath test/unit.test.ts
```

Ожидаемо: `type-check` и тест проходят.

После кодового коммита шага 3:

```bash
npm run type-check
npm test -- --runTestsByPath test/unit.test.ts
```

Результат:

```text
type-check: OK
PASS test/unit.test.ts
```

## Шаг 4. Массово переименовать JavaScript-файлы

Коммит с инструкцией: `docs: step 4 rename project files`

Вариант через `ts-migrate`:

```bash
npm install --save-dev ts-migrate
npx -p ts-migrate -c "ts-migrate-full ."
npm remove ts-migrate
```

Зачем `npm remove ts-migrate`:

- `ts-migrate` нужен один раз для стартового преобразования;
- результат уже записан в файлы проекта;
- для обычной разработки нужны `typescript`, `tsc`, Jest и ESLint;
- лишняя dev-зависимость усложняет установку и обновления.

Минимальный ручной вариант:

```bash
git mv src/discount.js src/discount.ts
git mv test/discount.test.js test/discount.test.ts
```

Проверить:

```bash
npm run type-check
```

Ожидаемо: после массового переименования появляются ошибки типов. Их исправляем следующими шагами.

После кодового коммита шага 4:

```bash
npm run type-check
```

Типичные ошибки:

```text
Parameter implicitly has an 'any' type.
Could not find a declaration file for module 'supertest'.
Cannot redeclare block-scoped variable.
Property 'toMatchSchema' does not exist on type 'JestMatchers'.
```

## Шаг 5. Стабилизировать проект после rename

Коммит с инструкцией: `docs: step 5 stabilize migrated project`

Что сделать:

```bash
git mv jest.config.ts jest.config.cjs
git mv setup-jest.ts setup-jest.js
```

Почему:

- Jest должен прочитать конфиг до Babel-трансформации;
- `.cjs` явно говорит Node.js, что это CommonJS-конфиг;
- setup-файл Jest проще оставить `.js`, если он использует `require`.

Исправлять ошибки `implicit any` нужно нормальными типами:

```ts
export const getTodo = async (id: number) => {}
```

Для объектных параметров добавляем `type`:

```ts
type UserCredentials = {
  userName: string
  password: string
}

const createUser = async ({ userName, password }: UserCredentials) => {}
```

Для массивов описываем элемент массива:

```ts
type Product = {
  price: number
  quantity: number
}

export function calculateTotal(products: Product[], discount: number) {}
```

Не использовать:

```ts
const createUser = async payload => {}
const getTodo = async id => {}
```

Запустить:

```bash
npm run type-check
```

Ожидаемо: ошибок меньше, но миграция ещё не завершена.

После кодового коммита шага 5:

```bash
npm run type-check
```

Оставшийся класс ошибок:

```text
Property 'toMatchSchema' does not exist on type 'JestMatchers'.
```

## Шаг 6. Подключить типы кастомных Jest matcher

Коммит с инструкцией: `docs: step 6 add jest schema matcher types`

Проблема:

```text
Property 'toMatchSchema' does not exist on type 'JestMatchers'.
```

Причина: в `tsconfig.json` указано свойство `types`, поэтому TypeScript подключает только перечисленные пакеты типов.

Добавить типы `jest-json-schema`:

```json
{
  "compilerOptions": {
    "types": ["node", "jest", "jest-json-schema"]
  }
}
```

Запустить:

```bash
npm run type-check
npm test -- --runTestsByPath test/unit.test.ts test/discount.test.ts
```

Ожидаемо: проверка типов проходит, выбранные тесты проходят.
