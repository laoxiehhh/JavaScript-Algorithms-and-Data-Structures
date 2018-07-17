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

  /**
   * @return {*}
   */
  poll () {
    if (this.heapContainer.length === 0) {
      return null
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop()
    }

    const item = this.heapContainer[0]
    // Move the last element from the end to the head.
    this.heapContainer[0] = this.heapContainer.pop()
    this.heapifyDown()
    return item
  }

  /**
   * @param {*} item 
   * @return {MinHeap}
   */
  add (item) {
    this.heapContainer.push(item)
    this.heapifyUp()
    return this
  }

  /**
   * @param {*} item 
   * @param {*} customComparator 
   * @return {Number[]}
   */
  find (item, customComparator) {
    const foundItemIndices = []
    const comparator = customComparator || this.compare

    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex ++) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex)
      }
    }
    return foundItemIndices
  }

  /**
   * @param {*} item 
   * @param {Comparator} customFindingComparator 
   * @return {MinHeap}
   */
  remove (item, customFindingComparator) {
    // Find number of items to move
    const customComparator = customFindingComparator || this.compare
    const numberOfItemsToMove = this.find(item, customComparator).length

    for (let iteration = 0; iteration < numberOfItemsToMove; iteration ++) {
      // We need to find item index to remove each time after removal since
      // indices are being change after each heapify process
      const indexToRemove = this.find(item, customComparator).pop()

      // If we need to remove last child in the heap then just remove it
      // There is no need to heapify the heap afterwards
      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop()
      } else {
        // Move last element to the removed position
        this.heapContainer[indexToRemove] = this.heapContainer.pop()

        // get parent
        const parentItem = this.hasParent(indexToRemove) ? this.parent(indexToRemove) : null
        const leftChild = this.hasLeftChild(indexToRemove) ? this.leftChild(indexToRemove) : null

        if (
          leftChild !== null
          && (
            parentItem === null
            || this.compare.lessThen(parentItem, this.heapContainer[indexToRemove])
          )
        ) {
          this.heapifyDown(indexToRemove)
        } else {
          this.heapifyUp(indexToRemove)
        }
      }
    }
    return this
  }

  /**
   * @return {boolean}
   */
  isEmpty () {
    return !this.heapContainer.length 
  }

  /**
   * @return {string}
   */
  toString () {
    return this.heapContainer.toString()
  }
}