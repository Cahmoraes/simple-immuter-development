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

const nextPeople = si.produce(person, draftState => {
  draftState.hobbies.set('read', 'books')
  draftState.hobbies.delete('movie')
})

nextPeople.hobbies.set('sport', 'footbal')
log(nextPeople.hobbies)

// log(assert.deepEqual(nextPeople, people))

