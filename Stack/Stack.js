import LinkedList from '../Linked-list/LinkedList'

export default class Stack {
  constructor () {
    this.linkedList = new LinkedList()
  }

  isEmpty () {
    return !this.linkedList.tail
  }

  peek () {
    return this.isEmpty() ? null : this.linkedList.tail.value
  }

  push (value) {
    this.linkedList.append(value)
  }

  pop () {
    const removeTail = this.linkedList.deleteTail()
    return removeTail ? removeTail.value : null
  }

  toArray () {
    return this.linkedList
      .toArray()
      .map(node => node.value)
      .reverse()
  }

  toString (callback) {
    return this.linkedList.toString(callback)
  }
}