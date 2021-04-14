import { writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import faker from 'faker'
import { Person } from '../class/person.js'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))
const seederBaseFolder = join(__dirname, '../', 'database')

const MAX_PERSONS = 4
const persons = []

for (let i = 0; i < MAX_PERSONS; i++) {
  const person = new Person({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    age: faker.datatype.number({ min: 18, max: 50 }),
    gender: faker.random.arrayElement(['M', 'F']),
    jobTitle: faker.name.jobTitle()
  })

  persons.push(person)
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data))

;(async () => {
  await write('persons.json', persons)
})()