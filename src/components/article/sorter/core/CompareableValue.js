var compareableValueId = 0

export default function CompareableValue (value) {
  this.id = compareableValueId++
  this.value = value
}

CompareableValue.prototype.compareTo = function (that) {
  if (this.value < that.value) return -1
  if (this.value > that.value) return 1
  return 0
}
