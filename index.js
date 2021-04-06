import { si } from './src/si.js'
const log  = (...args) => console.log(...args)

const baseState = {
  name: 'caique',
  address: {
    street: 'Rua x',
    number: 6,
  },
  phone: {
    fixo: [
      '00000-0000',
      '1111-1111',
    ],
    mobile: [
      '99999-9999',
      '9999-88888'
    ]
  },
  hobbies: new Map([
    ['video game', [['crash', 'carros', new Map([['map','teste']])]]]
  ]),
  getName() {
    return this.name
  }
}

const nextState = si.produce(baseState, (draftState) => {
  draftState.name = 'caique moraes'
  delete draftState.phone
  draftState.address.city = 'São Paulo'
  delete draftState.address.street
  draftState.siblings = [
    { name: 'thomas', age: 20 },
    { name: 'isabella', age: 22 },
    { name: 'igor', age: 15 }
  ]
  draftState.hobbies.get('video game')[0][2].set('map', 'teste2')
})

log(nextState)

