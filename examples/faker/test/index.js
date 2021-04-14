import { readFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { si } from '../../../src/si.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, '../database/', 'persons.json')

const readPersons = (file) => readFile(file, { encoding: 'utf8' })

;(async () => {
  const people = JSON.parse(await readPersons(file))
  const nextState = si.produce(people)
  console.log(nextState[0].name)
})()