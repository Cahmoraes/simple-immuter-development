import { deepStrictEqual, strictEqual } from 'assert'
import { si } from '../src/si.js'

const log = (...args) => console.log(...args)

const user = {
  name: 'John Doe',
  age: 20,
  hobbies: new Map([
    ['film', 'action'],
    ['music', 'rock']
  ])
}
;(async() => {
  {
    const promise = Promise.resolve(user)
    const nextState = await si.produce(promise,   draftState => {
      delete draftState.age
      draftState.hobbies.set('book', 'science')
    })
    log(nextState)
  }
})()
