import MinHeap from '../MinHeap/MinHeap'
import Comparator from '../util/comparator'

// It is the same as min heap except that when comparing to elements
// we take into account not element's value but rather its priority.
export default class PriorityQueue extends MinHeap {
  constructor () {
    super()
    this.priorities = {}
    this.compare = new Comparator(this.comparePriority.bind(this))
  }

  /**
   * @param {*} a 
   * @param {*} b 
   * @return {number}
   */
  comparePriority (a, b) {
    if (this.priorities[a] === this.priorities[b]) {
      return 0
    }
    return this.priorities[a] < this.priorities[b] ? -1 : 1
  }

  /**
   * @param {*} item 
   * @param {number} priority
   * @return {PriorityQueue} 
   */
  add (item, priority = 0) {
    this.priorities[item] = priority
    super.add(item)
    return this
  }

  /**
   * @param {*} item 
   * @param {Comparator} customFindingComparator 
   * @return {PriorityQueue}
   */
  remove (item, customFindingComparator) {
    super.remove(item, customFindingComparator)
    delete this.priorities[item]
    return this
  }

  changePriority (item, priority) {
    this.remove(item, new Comparator())
  }

  findByValue (item) {
    return this.find(item, new Comparator(this.compareValue))
  }

  hasValue (item) {
    return this.findByValue(item).length > 0
  }

  compareValue (a, b) {
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }

}