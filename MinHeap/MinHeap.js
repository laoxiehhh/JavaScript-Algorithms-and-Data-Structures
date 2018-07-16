import Comparator from '../util/comparator'

export default class MinHeap {
  /**
   * @param {function} comparatorFunction 
   */
  constructor (comparatorFunction) {
    this.heapContainer = []
    this.compare = new Comparator(comparatorFunction)
  }

  /**
   * @param {number} parentIndex 
   * @return {number}
   */
  getLeftChildIndex (parentIndex) {
    return (2 * parentIndex) + 1
  }

  /**
   * @param {number} parentIndex 
   * @return {number}
   */
  getRightChildIndex (parentIndex) {
    return (2 * parentIndex) + 2
  }

  /**
   * @param {number} childIndex 
   * @return {number}
   */
  getParentIndex (childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  /**
   * @param {number} childIndex 
   * @return {boolean}
   */
  hasParent (childIndex) {
    return this.getParentIndex(childIndex) >= 0
  }

  /**
   * @param {number} parentIndex 
   * @return {boolean}
   */
  hasLeftChild (parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
  }

  /**
   * @param {number} parentIndex 
   * @return {boolean}
   */
  hasRightChild (parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length
  }

  /** 
   * @param {number} parentIndex 
   * @return {*}
   */
  leftChild (parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)]
  }

  /**
   * @param {number} parentIndex
   * @return {*} 
   */
  rightChild (parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)]
  }

  /**
   * @param {number} childIndex
   * @return {*} 
   */
  parent (childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)]
  }

  /**
   * @param {number} indexOne 
   * @param {number} indexTwo 
   */
  swap (indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo]
    this.heapContainer[indexTwo] = this.heapContainer[indexOne]
    this.heapContainer[indexOne] = tmp
  }

  /**
   * @return {*}
   */
  peek () {
    if (this.heapContainer.length === 0) {
      return null
    }
    return this.heapContainer[0]
  }

  /**
   * @param {number} customStartIndex 
   */
  heapifyUp (customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1
    while (
      this.hasParent(currentIndex)
      && this.compare.lessThen(this.heapContainer[currentIndex], this.parent(currentIndex))
    ) {
      let parentIndex = this.getParentIndex(currentIndex)
      this.swap(currentIndex, parentIndex)
      currentIndex = parentIndex
    }
  }
  /**
   * 
   * @param {number} customStartIndex 
   */
  heapifyDown (customStartIndex) {
    let currentIndex = customStartIndex || 0
    let nextIndex = null

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex)
        && this.compare.lessThen(this.rightChild(currentIndex), this.leftChild(currentIndex))
      ) { 
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex)
      }

      if (this.compare.lessThen(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break
      }

      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
  }
}