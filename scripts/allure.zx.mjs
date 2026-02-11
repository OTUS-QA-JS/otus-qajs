#!/usr/bin/env zx

import { $ } from 'zx'
import fs from 'fs-extra'

const ALLURE_RESULT_PATH = process.env.ALLURE_RESULT_PATH ?? './reports/allure-results'
const ALLURE_REPORT_PATH = process.env.ALLURE_REPORT_PATH ?? './reports/allure-report'

await fs.remove(ALLURE_RESULT_PATH)
await $`npm test`.nothrow()
await $`node scripts/allure-history.mjs`
await $`npx allure generate ${ALLURE_RESULT_PATH} --clean --report-dir ${ALLURE_REPORT_PATH}`
