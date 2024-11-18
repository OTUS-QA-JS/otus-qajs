import fs from 'fs-extra'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function copyHistory() {
  const allureReportDir = path.resolve(__dirname, '../reports/allure-report')
  const allureResultsDir = path.resolve(__dirname, '../reports/allure-results')
  const historyDir = 'history'

  const historySourcePath = path.join(allureReportDir, historyDir)
  const historyDestPath = path.join(allureResultsDir, historyDir)

  try {
    // Проверяем наличие директории history в allure-report
    const historyExists = await fs.pathExists(historySourcePath)
    if (!historyExists) {
      console.error(
        `Директория history не найдена в ${historySourcePath}. Если это не первый запуск скрипта, проверьте правильность пути.`
      )
      return
    }

    // Удаляем предыдущие результаты allure-results/history
    await fs.remove(historyDestPath)

    // Копируем директорию history в allure-results
    await fs.copy(historySourcePath, historyDestPath)
  } catch (error) {
    console.error('Произошла ошибка:', error)
  }
}

await copyHistory()
