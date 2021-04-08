import { strict as assert } from 'assert'
import { si } from '../src/si.js'
const log = (...args) => console.log(...args)

const nums = [1, 2, 3, [4], [[5],6]]
const nextNums = si.produce(nums)

// log(nums, nextNums)
// nums:     [ 1, 2, 3, [ 4 ], [ [ 5 ], 6 ] ] 
// nextNums: [ 1, 2, 3, [ 4 ], [ [ 5 ], 6 ] ]
// log(nums === nextNums) // false

const person = {
  name: {
    first: 'John',
    last: 'Doe'
  },
  age: 30,
  hobbies: new Map([
    ['video-game', 'playstation'],
    ['television', 'cartoon'],
    ['movie', new Map([
      ['action', 'Avengers'],
      ['comedy', 'Os penetras']
    ])]
  ]),
  address: {
    street: 'Baker Street',
    number: '221B',
    city: 'London'
  }
}

const nextPerson = si.produce(person, draftState => {
  draftState.hobbies.set('read', 'books')
  draftState.hobbies.delete('movie')
})

nextPerson.hobbies.set('sport', 'footbal')
log(nextPerson.hobbies)

const frutas_1 = ['banana', 'maçã', 'pera']
const frutas_2 = ['limão', 'morango']
const frutas_3 = ['pêssego']
const frutas_4 = ['pêssego', 'mamão']

const nextFrutas = si.produce(frutas_1, frutas_2, frutas_3, frutas_4)
// log(nextFrutas)

const cars_1 = {
  'ferrari': 'vermelho',
  'porsche': 'braco'
}
const cars_2 = {
  'masserati': 'azul',
  'Koenigsegg': 'laranja'
}
const cars_3 = {
  'mazda': 'verde',
  'eclipse': 'azul'
}
const cars_4 = {
  'lamborghini': 'amarelo'
}
// const nextCars = si.produce(cars_1, cars_2, cars_3, cars_4)
// log(nextCars)

const typeCheck = (elementToCheck) => {
  const stringType = Object.prototype.toString.call(elementToCheck)
  return stringType.substring(
    stringType.indexOf(' ') + 1,
    stringType.indexOf(']')
  ).toLowerCase()
}

const areDifferents = (...types) => {
  for (let j = 0, i = j + 1; i < types.length; i = j + 1, j++) {
    if (typeCheck(types[j]) !== typeCheck(types[i])) {
      return true
    }
  }
  return false
}

console.log(areDifferents('name', 3))