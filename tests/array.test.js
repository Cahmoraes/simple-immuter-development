import assert from 'assert'
import { si } from '../src/si.js'

const log = (...args) => console.log(...args)

const people = ['James', 'Bia', 'Jhon', 'Ana']

const nextState =  si.produce(people, draftState => {
  draftState.push('caique')
})

people.push('caique')

assert.deepStrictEqual(people, nextState)

const people2 = [
  { id: 1, name: 'James' },
  { id: 2, name: 'Bia' },
  { id: 3, name: 'Jhon' },
  { id: 4, name: 'Ana' }
]

const nextState2 = si.produce(people2, draftState => {
  draftState.forEach((person, index) => {
    draftState[index] = {...person, name: person.name.toLowerCase()}
  })
})

log(nextState2)
