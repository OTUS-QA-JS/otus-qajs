import fsp from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function copyHistory() {
  const allureReportDir = path.resolve(__dirname, '../reports/allure-report')
  const allureResultsDir = path.resolve(__dirname, '../reports/allure-results')
  const historyDir = 'history'

  try {
    // Проверяем наличие директории history в allure-report
    const historySourcePath = path.join(allureReportDir, historyDir)
    const historyDestPath = path.join(allureResultsDir, historyDir)

    try {
      await fsp.access(historySourcePath)
    } catch (error) {
      console.error(`Директория history не найдена в ${historySourcePath}. Сначала создайте отчет.`)
      console.error(error)
      return
    }

    // Удаляем предыдущие результаты allure-results/history
    try {
      await fsp.rm(historyDestPath, { recursive: true, force: true })
    } catch (error) {
      console.error(`Ошибка при удалении директории ${historyDestPath}:`, error)
      return
    }

    // Создаем директорию allure-results
    await fsp.mkdir(historyDestPath, { recursive: true })

    // Копируем директорию history в allure-results
    await copyDirectory(historySourcePath, historyDestPath)
  } catch (error) {
    console.error('Произошла ошибка:', error)
  }
}

async function copyDirectory(src, dest) {
  const entries = await fsp.readdir(src, { withFileTypes: true })

  await fsp.mkdir(dest, { recursive: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath)
    } else {
      await fsp.copyFile(srcPath, destPath)
    }
  }
}

await copyHistory()
