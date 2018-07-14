import LinkedList from '../Linked-list/LinkedList'

export default class Queue {
  constructor () {
    this.linkedList = new LinkedList()
  }

  isEmpty () {
    return !this.linkedList.tail
  }

  peek () {
    return this.linkedList.head ? this.linkedList.head.value : null
  }

  enqueue (value) {
    this.linkedList.append(value)
  }

  dequeue () {
    const removeHead = this.linkedList.deleteHead()
    return removeHead ? removeHead.value : null
  }

  toString (calllback) {
    return this.linkedList.toString(callback)
  }
}