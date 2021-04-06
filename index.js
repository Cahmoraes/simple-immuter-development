import { si } from './src/si.js'
const log  = (...args) => console.log(...args)


const obj = {
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

const clonedObj = si.produce(obj, (draft) => {
  draft.name = 'caique moraes'
  delete draft.phone
  draft.address.city = 'São Paulo'
  delete draft.address.street
  draft.siblings = [
    { name: 'thomas', age: 20 },
    { name: 'isabella', age: 22 },
    { name: 'igor', age: 15 }
  ]
  draft.hobbies.get('video game')[0][2].set('map', 'teste2')
})
log(obj.hobbies.get('video game')[0][2].get('map'))
log(clonedObj.hobbies.get('video game')[0][2].get('map'))