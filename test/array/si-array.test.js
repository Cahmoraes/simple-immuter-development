const assert = require('assert')
const { log } = require('console')
const { describe, it } = require('mocha')
const si = require('../../src/si')

const peopleMock = require('../mock/people.json')
const typeCheck = require('../utils/typeCheck')

describe('Simple Immuter - Array', () => {

  describe('si.produce(array)', () => {

    describe('baseState = array', () => {
      const people = ['caique', 'thomas', 'isabella', 'igor']
      let nextState = []
      
      before(() => {
        nextState = si.produce(people)
      })

      it('should return the same element if baseState to be a primitive type', () => {
        const numberOne = 1
        const nextState = si.produce(numberOne)
        assert.deepStrictEqual(numberOne, nextState)
      })
  
      it('should receive an array and return an new array with the same properties', () => {
        assert.deepStrictEqual(nextState, people)
      })

      it('should make a deep clone to array with same properties and structure', () => {
        const depthArray = [1, [2, [3, [4], 5], 6], 7, [[[[[8]]]]]]
        const nextState = si.produce(depthArray)
        assert.deepStrictEqual(nextState, depthArray)
      })

      it('should return the same type of baseState', () => {
        assert.ok(typeCheck(nextState) === typeCheck(people))
      })
  
      it('should return an new array in another memory address', () => {
        assert.notStrictEqual(nextState, people)
      })

      it('should not add element at newState', () => {
        const error = new TypeError('Cannot add property 4, object is not extensible')
        assert.throws(() => nextState.push('John'), error)
      })

      it('should not remove element at newState', () => {
        const error = new TypeError(`Cannot delete property '3' of [object Array]`)
        assert.throws(() => nextState.pop(), error)
      })

      it('should not change newState', () => {
        const error = new TypeError(`Cannot add property 4, object is not extensible`)
        assert.throws(() => nextState.splice(0, 0, 'Bolt'), error)
      })

      it('should return freeze Object', () => {
        assert.ok(Object.isFrozen(nextState))
      })
    })

    describe('si.produce(array, producer)', () => {
      it('should not return draftState equals baseState', () => {
        const nextState = si.produce(peopleMock, () => {})
        assert.notStrictEqual(nextState, peopleMock)
      })
  
      it('should remove 1 element at nextState', () => {
        const nextState = si.produce(peopleMock, draftState => {
          draftState.pop()
        })
        assert.ok(nextState.length < peopleMock.length)
      })
  
      it('should add 1 element at nextState', () => {
        const person = {...peopleMock[0] }
        const nextState = si.produce(peopleMock, draftState => {
          draftState.push(person)
        })
        assert.ok(nextState.length > peopleMock.length)
      })
  
      it('should return properties in new memory address', () => {
        const nextState = si.produce(peopleMock, () => {})
        assert.ok(Reflect.has(nextState[0], 'address'))
        assert.ok(nextState[0].address !== peopleMock[0].address)
      })
  
      it('should return the same properties content', () => {
        const nextState = si.produce(peopleMock, () => {})
        assert.ok(Reflect.has(nextState[0], 'address'))
        assert.deepStrictEqual(nextState[0].address, peopleMock[0].address)
      })
      
      it('should return the same type of baseState', () => {
        const nextState = si.produce(peopleMock, () => {})
        assert.ok(typeCheck(nextState) === typeCheck(peopleMock))
      })
  
      it('should not change baseState', () => {
        const copyBaseState = [...peopleMock]
        si.produce(peopleMock, draftState => {
          draftState.unshift()
        })
        assert.deepStrictEqual(copyBaseState, peopleMock)
      })
  
    })
  })

  describe('si.produce(array, array2, ...arrayN)', () => {

    it('should merge 2 arrays', () => {
      const people = ['caique', 'thomas', 'isabella', 'igor']
      const newPerson = ['bolt']
      const nextState = si.produce(people, newPerson)
      assert.deepStrictEqual(nextState, [...people, ...newPerson])
    })

    it('should return a new array', () => {
      const people = ['caique', 'thomas', 'isabella', 'igor']
      const newPerson = ['bolt']
      const nextState = si.produce(people, newPerson)
      assert.notStrictEqual(nextState, people)
    })

    it('should merge 2 or more arrays', () => {
      const people = ['caique', 'thomas', 'isabella', 'igor']
      const bolt = ['bolt']
      const andrea = ['andrea']
      const nextState = si.produce(people, bolt, andrea)
      assert.deepStrictEqual(nextState, [...people, ...bolt, ...andrea])
    })

    it('should throw error if second parameter to be different of baseState', () => {
      const people = ['caique', 'thomas', 'isabella', 'igor']
      const error = new Error('baseState and producer are incompatibles')
      assert.throws(() => si.produce(people, {}), error)
    })

    it('should return undefined if second parameter to be different of baseState', () => {
      const people = ['caique', 'thomas', 'isabella', 'igor']
      const andrea = ['andrea']
      const nextState = si.produce(people, 'bolt', andrea, 'non-array')
      assert.ok(nextState === undefined)
    })

    it('should return undefined if any parameter to be different of baseState', () => {
      const people = ['caique', 'thomas', 'isabella', 'igor']
      const bolt = ['bolt']
      const andrea = ['andrea']
      const nextState = si.produce(people, bolt, andrea, 'non-array')
      assert.ok(nextState === undefined)
    })
  })
})
