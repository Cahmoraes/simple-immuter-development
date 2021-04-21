const assert = require('assert')
const { log } = require('console')
const { it, describe } = require('mocha')
const si = require('../../src/si')
const peopleMock = require('../mock/people.json')
const typeCheck = require('../utils/typeCheck')

describe('Simple Immuter - Promise', () => {
  it('should return a promise if receive a promise', async () => {
    const person = Promise.resolve('caique')
    const nextState = si.produce(person)
    assert.ok(typeCheck(person) === typeCheck(nextState))
    assert.ok(typeCheck(nextState) === 'promise')
  })

  it('should return a promise with the same content of baseState', async () => {
    const baseState = Promise.resolve(peopleMock)
    const nextState = si.produce(baseState)
    assert.deepStrictEqual(await baseState, await nextState)
  })

  it('should return an imutable object', async () => {
    const baseState = Promise.resolve(peopleMock)
    const nextState = si.produce(baseState)
    assert.ok(Object.isFrozen(await nextState))
  })

  it('should update promise"s content into draftState', async () => {
    const person = Promise.resolve({ name: 'caique' })
    const nextState = si.produce(person, draftState => {
      draftState.age = 28
      Reflect.deleteProperty(draftState, 'name')
    })
    assert.ok(Reflect.has(await nextState, 'age'))
    assert.ok(!Reflect.has(await nextState, 'name'))
  })
})