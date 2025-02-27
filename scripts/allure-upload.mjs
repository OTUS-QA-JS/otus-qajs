import fs from 'fs-extra'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import config from './allure-config.mjs'
import { tmpdir } from 'zx'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function saveHistory() {
  const tempDir = tmpdir()
  const allureResultsDir = path.resolve(__dirname, '../reports/allure-report')
  const historySourcePath = path.join(allureResultsDir, config.historyDir)

  try {
    await fs.remove(tempDir)

    execSync(`git clone -b ${config.branchName} ${config.repoUrl} ${tempDir}`, { stdio: 'inherit' })

    const historyDestPath = path.join(tempDir, config.historyDir)

    if (await fs.pathExists(historyDestPath)) {
      await fs.remove(historyDestPath)
    }
    await fs.copy(historySourcePath, historyDestPath)

    execSync('git add .', { cwd: tempDir, stdio: 'inherit' })
    execSync('git config user.email "bot@otus.qa"', { cwd: tempDir, stdio: 'inherit' })
    execSync('git config user.name "Bot"', { cwd: tempDir, stdio: 'inherit' })
    execSync(`git commit -m "Update history"`, { cwd: tempDir, stdio: 'inherit' })
    execSync(`git push origin ${config.branchName}`, { cwd: tempDir, stdio: 'inherit' })

    console.log('History успешно сохранена в удалённый репозиторий.')
  } catch (error) {
    console.error('Ошибка при сохранении history:', error)
  } finally {
    await fs.remove(tempDir)
  }
}

await saveHistory()
