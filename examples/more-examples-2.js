import { si } from '../src/si.js'

const typeCheck = (elementToCheck) => {
  const stringType = Object.prototype.toString.call(elementToCheck)
  return stringType.substring(
    stringType.indexOf(' ') + 1,
    stringType.indexOf(']')
  ).toLowerCase()
}

const areDifferents = (...types) => {
  let pivo = 0
  for (let i = pivo + 1; i < types.length; i = pivo + 1) {
    if (typeCheck(types[pivo]) !== typeCheck(types[i])) {
      console.log(typeCheck(types[pivo]), typeCheck(types[i]))
      return true
    }
    pivo++
  }
  return false
}



// si.produce([],{})

// const person = {
//   name: 'caique',
//   age: 27,
//   address: {
//     city: 'São Paulo'
//   }
// }

// const nextState = si.produce(person, draftState => {
//   draftState.address = undefined
//   delete draftState.name
// })

// console.log(nextState)

// const frutas_1 = ['banana', 'maçã', 'pera']
// const nextFrutas = si.produce(frutas_1, draftState => {
//   draftState.pop()
//   draftState.push('limão')
//   draftState.shift()
//   draftState.unshift('romã')
// })

// console.log(nextFrutas)
