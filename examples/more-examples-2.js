import { si } from '../src/si.js'

si.produce([],{})

const person = {
  name: 'caique',
  age: 27,
  address: {
    city: 'São Paulo'
  }
}

const nextState = si.produce(person, draftState => {
  draftState.address = undefined
  delete draftState.name
})

console.log(nextState)

const frutas_1 = ['banana', 'maçã', 'pera']
const nextFrutas = si.produce(frutas_1, draftState => {
  draftState.pop()
  draftState.push('limão')
  draftState.shift()
  draftState.unshift('romã')
})

console.log(nextFrutas)
