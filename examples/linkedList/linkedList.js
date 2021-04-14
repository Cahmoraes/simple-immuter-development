import { Node } from './node.js'
import { defaultEquals } from './defaultEquals.js'
import { si } from '../../src/si.js'

const log = (...args) => console.log(...args)

class LinkedList {
  constructor (equalsFn = defaultEquals) {
    this.head = null
    this.count = 0
    this.equalsFn = equalsFn
  }

  size () {
    return this.count
  }

  isEmpty () {
    return this.size === 0
  }

  clear (equalsFn = defaultEquals) {
    this.count = 0
    this.head = null
    this.equalsFn = equalsFn
  }

  insertElement (element) {
    const node = new Node(element)
    if (!this.head) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {        
        current = current.next
      }
      current.next = node
    }
    this.count++
  }

  getElementAt (index) {
    if (index >= 0 && index < this.size()) {
      if (index === 0) return this.head
      let current = this.head
      for (let i = 0; i < index; i++) {
        current = current.next
      }
      return current
    }
  }

  insertElementAt (element, index) {
    if (index >= 0 && index <= this.size()) {
      const node = new Node(element)
      let currentNode = this.head
      if (index === 0) {
        this.head = node
        node.next = currentNode
      } else {
        const previousNode = this.getElementAt(index - 1)
        currentNode = previousNode.next
        previousNode.next = node
        node.next = currentNode
      }
      this.count++
      return true
    }
    return false
  }

  removeAt (index) {
    if (index >= 0 && index < this.size()) {
      let currentNode = this.head
      if (index === 0) {
          this.head = currentNode.next
      } else {
        const previousNode = this.getElementAt(index - 1)
        currentNode = previousNode.next
        previousNode.next = currentNode.next
      }
      this.count--
      return currentNode
    }
  }

  indexOf (element) {
    let current = this.head
    for (let i = 0; i < this.size(); i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return - 1
  }

  remove (element) {
    const index = this.indexOf(element)
    return !! this.removeAt(index)
  }

  toString () {
    if (this.isEmpty()) return ''
    let list = this.head.element
    let current = this.head.next
    while (current) {
      list = `${list}, ${current.element}`
      current = current.next
    }
    return list
  }
}

const l = new LinkedList()
l.insertElement('caique')
l.insertElement('thomas')

const nextState = si.produce(l, draftState => {
  draftState.insertElement('isabella')
  draftState.removeAt(0)
})
log(nextState.head)
