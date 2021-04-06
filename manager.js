import { si } from './src/si.js'

const log = (...args) => console.log(...args)

const initialState = [
  { id: 1, name: 'caique' }
]

const managerState = (state) => {

  const setState = (newState) => {
    state = si.produce(newState)
  }

  const getState = () => {
    return si.produce(state)
  }

  const addElement = (newElement) => {
    setState([...state, newElement])
  }

  const removeElement = (elementToRemove) => {
    const newState = state.filter((_, index) => index !== elementToRemove)
    setState(newState)
  }

  const updateElement = (id, body) => {
    const indexElementToChange = state.findIndex(element => 
      element.id === id
    )

    if (indexElementToChange < 0) return false    
    const nextState = si.produce(state, draftState => {
      draftState[indexElementToChange] = {
        ...draftState[indexElementToChange],
        ...body
      }
    })

    setState(nextState)
  }

  return ({
    getState,
    addElement,
    removeElement,
    updateElement
  })
}

const state = managerState(initialState)
state.addElement({ id: 2, name: 'thomas' })
state.removeElement(1)
state.updateElement(1, { name: 'caique moraes 123' })
log(Object.isFrozen(state.getState()))