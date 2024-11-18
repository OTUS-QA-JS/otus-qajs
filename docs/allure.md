# Добавление Allure в проект

Подробная инструкция на английском: [allurereport.org/docs/jest](https://allurereport.org/docs/jest/)

## Подготовка

Убедитесь, что установлена Java версии 8 или выше, а ее каталог указан в переменной окружения `JAVA_HOME`.
Инструкция на русском с примерами установки для windows, macos, ubuntu
https://learn.microsoft.com/ru-ru/java/openjdk/install

В windows 11/10 можно установить java из консоли:

```bash
# сначала проверьте, может быть уже установлена
java --version

# если хотите проверить, какие ещё есть
winget search openjdk

# сама установка
winget install Microsoft.OpenJDK.21
```

## Установка

```bash
# установим Allure Report command-line tools
npm install --save-dev allure-commandline

# плагин allure для jest
npm install --save-dev allure-jest
```

В `jest.config.cjs` нужно добавить `testEnvironment: 'allure-jest/node'`

Пример конфига (если нет никаких настроек jest, только allure добавляем)

```js
const config = {
  testEnvironment: 'allure-jest/node',
  testEnvironmentOptions: {
    resultsDir: 'reports/allure-results'
  }
}
```

В `.gitignore` нужно добавить папки
`reports/allure-results` -- служебная, из неё `allure` будет генерировать отчёт
`reports/allure-report` -- в эту папку `allure` сохранит `.html` отчёт

### Использование

Сначала запустим тесты и сгенерируем отчёты

```bash
npm test
```

После запуска тестов должна появиться папка `reports/allure-results`

Посмотреть отчёт:

```bash
npx allure serve reports/allure-results
```

Собрать отчёт:

```bash
npx allure generate reports/allure-results --clean --report-dir reports/allure-report
```

Посмотреть собранный отчёт:

```bash
npx allure open reports/allure-report
```

Для удобства, можно создать алисы в `package.json -> scripts`:

```json
{
  "scripts": {
    "allure": "allure serve reports/allure-results",
    "allure:ci": "allure generate reports/allure-results --clean --report-dir reports/allure-report",
    "allure:ci:show": "allure open reports/allure-report"
  }
}
```

Использование:

```bash
# этой командой мы будем пользоваться локально
npm run allure

# это надо будет нужна только в CI и мб в случаях, когда заходим передать готовый отчёт кому-то другому
npm run allure:ci

# эта чтобы проверить, что предыдущая отработала правильно, может пригодится локально
npm run allure:ci:show
```

### Ссылки:
[Allure Jest configuration](https://allurereport.org/docs/jest-configuration/)
