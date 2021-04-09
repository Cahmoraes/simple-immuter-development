import { si } from '../src/si.js'

const log = (...args) => console.log(...args)

const managerState = (state = []) => {
  state = si.produce(state)
  
  const setState = (newState) => {
    state = si.produce(newState)
  }

  const getState = () => {
    return state
  }

  const addElement = (element) => {
    setState([...state, element])
  }

  const removeElement = (id) => {
    const newState = state.filter(element => element.id !== id)
    setState(newState)
  }

  const updateElement = (id, body) => {
    const indexElementToChange = state.findIndex(
      element => element.id === id
    )
    
    if (indexElementToChange < 0) return false

    const newState = [...state]
    newState[indexElementToChange] = {
      ...newState[indexElementToChange],
      ...body
    }

    setState(newState)

  }

  return ({
    addElement,
    getState,
    removeElement,
    updateElement
  })
}

const state  = managerState()
state.addElement({ id: 1, name: 'caique', age: 27 })
state.addElement({ id: 2, name: 'thomas', age: 20 })
state.addElement({ id: 3, name: 'igor', age: 15 })
state.removeElement(1)
state.updateElement(2, { name: 'isabella' })
log(state.getState())