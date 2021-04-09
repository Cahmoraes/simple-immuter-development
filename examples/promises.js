import { si } from '../src/si.js'

const log = (...args) => console.log(...args)
const person = Promise.resolve({ name: 'caique' })


si.produce(person, draftState => {
  draftState.name = 'caique'
  draftState.age = 25
}).then(result => {
  log(result)
})
