/**
 * @param function (a: *, b: *) {} 
 */
export default class Comparator {

  constructor (comparatorFunction) {
    this.compare = comparatorFunction || Comparator.defaultCompareFunction 
  }

  static defaultCompareFunction (a, b) {
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }

  equal (a, b) {
    return this.compare(a, b) === 0
  }

  lessThen (a, b) {
    return this.compare(a, b) < 0
  }

  greaterThen () {
    return this.compare(a, b) > 0
  }

  lessThenOrEqual (a, b) {
    return this.lessThen(a, b) || this.equal(a, b)
  }

  greaterThenOrEqual () {
    return this.greaterThen(a, b) || this.equal(a, b)
  }

  reverse () {
    const compareOriginal = this.compare
    this.compare = (a, b) => this.compareOriginal(b ,a)
  }
}