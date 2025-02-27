import fs, { mkdirp } from 'fs-extra'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import config from './allure-config.mjs'
import { tmpdir } from 'zx'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createEmptyBranch(repoUrl, branchName, tempDir) {
  try {
    execSync('git config user.email "bot@otus.qa"', { cwd: tempDir, stdio: 'inherit' })
    execSync('git config user.name "Bot"', { cwd: tempDir, stdio: 'inherit' })
    execSync(`git init`, { cwd: tempDir, stdio: 'inherit' })
    execSync(`git remote add origin ${repoUrl}`, { cwd: tempDir, stdio: 'inherit' })

    execSync(`git checkout --orphan ${branchName}`, { cwd: tempDir, stdio: 'inherit' })

    execSync(`git commit --allow-empty -m "init"`, { cwd: tempDir, stdio: 'inherit' })

    execSync(`git push --set-upstream origin ${branchName}`, { cwd: tempDir, stdio: 'inherit' })

    console.log(`Пустая ветка ${branchName} успешно создана и опубликована.`)
  } catch (error) {
    console.error(`Ошибка при создании пустой ветки ${branchName}:`, error)
    console.log(tempDir)
    throw error
  }
}

async function fetchHistory() {
  const tempDir = tmpdir()
  const allureResultsDir = path.resolve(__dirname, '../reports/allure-results')
  const historyDestPath = path.join(allureResultsDir, config.historyDir)

  try {
    try {
      execSync(`git clone -b ${config.branchName} ${config.repoUrl} ${tempDir}`, { stdio: 'inherit' })
    } catch {
      createEmptyBranch(config.repoUrl, config.branchName, tempDir)
    }

    const historySourcePath = path.join(tempDir, config.historyDir)

    const historyExists = await fs.pathExists(historySourcePath)
    if (!historyExists) {
      console.warn(`Папка history отсутствует в ветке ${config.branchName}`)
      await mkdirp(historySourcePath)
      return
    }

    await fs.remove(historyDestPath)
    await fs.copy(historySourcePath, historyDestPath)

    console.log('History успешно скачана и скопирована.')
  } catch (error) {
    console.error('Ошибка при загрузке history:', error)
  } finally {
    await fs.remove(tempDir)
  }
}

await fetchHistory()
