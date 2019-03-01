export default function Sorter () {
  this.snapshots = []
}

Sorter.prototype.snapshoot = function (a, i, j, type) {
  let snapshot = {}

  let array = a.map(function (d, index) {
    return {
      id: d.id,
      value: d.value,
      index: index,
      isExch: type === 'exch' && (index === i || index === j),
      isLess: type === 'less' && (index === i || index === j)
    }
  })

  snapshot.array = array
  snapshot.type = type

  this.snapshots.push(snapshot)
}

Sorter.prototype.clearSnapshots = function () {
  this.snapshots = []
}

Sorter.prototype.sort = function (a) {
  return a.sort(function (a, b) {
    return a.value - b.value
  })
}

Sorter.prototype.less = function (a, i, j) {
  this.snapshoot(a, i, j, 'less')
  return a[i].compareTo(a[j]) < 0
}

Sorter.prototype.exch = function (a, i, j) {
  let t = a[i]
  a[i] = a[j]
  a[j] = t

  this.snapshoot(a, i, j, 'exch')
}

Sorter.prototype.isSorted = function (a) {
  for (let i = 1; i < a.length; i++) {
    if (this.less(a, i, i - 1)) {
      return false
    }
  }
  return true
}

Sorter.prototype.getInversion = function (a) {
  let inversions = []
  for (let i = 0; i < a.length; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (this.less(a, j, i)) {
        inversions.push({
          a: a[i],
          b: a[j]
        })
      }
    }
  }
  return inversions
}
