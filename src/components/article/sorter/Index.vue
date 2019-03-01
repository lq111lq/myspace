<template>
  <div>
    <h3>排序</h3>
    <p>
      <SorterSnapshot :snapshot="selectionSnapshot"></SorterSnapshot> 选择排序
      <SorterSnapshot :snapshot="insertionSnapshot"></SorterSnapshot> 插入排序
      <SorterSnapshot :snapshot="shellSnapshot"></SorterSnapshot> 希尔排序
      <SorterSnapshot :snapshot="mergeSnapshot"></SorterSnapshot> 并归排序
      <SorterSnapshot :snapshot="quickSnapshot"></SorterSnapshot> 快速排序
    </p>
    <p>
      <span v-for="(n,i) in series" :key="i" class="label">{{n|number}}</span>
    </p>
    <p>
      <button @click="randomSeriesInput">生成数据</button>
      <button @click="play">播放</button>
      <input type="range" :max="maxIndex" min="0" step="1" v-model="snapshotIndex">
    </p>
  </div>
</template>

<script>
import CompareableValue from './core/CompareableValue.js'
import SelectionSorter from './core/SelectionSorter.js'
import InsertionSorter from './core/InsertionSorter.js'
import ShellSorter from './core/ShellSorter.js'
import MergeSorter from './core/MergeSorter.js'
import QuickSorter from './core/QuickSorter.js'
import SorterSnapshot from './SorterSnapshot.vue'
import anime from 'animejs'

const selectionSorter = new SelectionSorter()
const insertionSorter = new InsertionSorter()
const shellSorter = new ShellSorter()
const mergeSorter = new MergeSorter()
const quickSorter = new QuickSorter()

export default {
  name: 'SorterIndex',
  data () {
    return {
      snapshotIndex: 0,
      seriesInput: '',
      series: [],
      selectionSorterSnapshots: [],
      insertionSorterSnapshots: [],
      shellSorterSnapshots: [],
      mergeSorterSnapshots: [],
      quickSorterSnapshots: []
    }
  },
  components: {
    SorterSnapshot
  },
  computed: {
    maxIndex () {
      return Math.max(
        this.selectionSorterSnapshots.length,
        this.insertionSorterSnapshots.length,
        this.shellSorterSnapshots.length,
        this.mergeSorterSnapshots.length,
        this.quickSorterSnapshots.length
      ) - 1
    },
    selectionSnapshot () {
      return this.getSnapshot(this.selectionSorterSnapshots, this.snapshotIndex)
    },
    insertionSnapshot () {
      return this.getSnapshot(this.insertionSorterSnapshots, this.snapshotIndex)
    },
    shellSnapshot () {
      return this.getSnapshot(this.shellSorterSnapshots, this.snapshotIndex)
    },
    mergeSnapshot () {
      return this.getSnapshot(this.mergeSorterSnapshots, this.snapshotIndex)
    },
    quickSnapshot () {
      return this.getSnapshot(this.quickSorterSnapshots, this.snapshotIndex)
    }
  },
  watch: {
    seriesInput () {
      this.series = this.seriesInput.split(',')
      this.snapshotIndex = 0

      var series = this.series.map(function (d) {
        return new CompareableValue(Number(d))
      })

      selectionSorter.clearSnapshots()
      selectionSorter.sort(series)
      this.selectionSorterSnapshots = selectionSorter.snapshots

      series = this.series.map(function (d) {
        return new CompareableValue(Number(d))
      })

      insertionSorter.clearSnapshots()
      insertionSorter.sort(series)
      this.insertionSorterSnapshots = insertionSorter.snapshots

      series = this.series.map(function (d) {
        return new CompareableValue(Number(d))
      })

      shellSorter.clearSnapshots()
      shellSorter.sort(series)
      this.shellSorterSnapshots = shellSorter.snapshots

      series = this.series.map(function (d) {
        return new CompareableValue(Number(d))
      })

      mergeSorter.clearSnapshots()
      mergeSorter.sort(series)
      this.mergeSorterSnapshots = mergeSorter.snapshots

      series = this.series.map(function (d) {
        return new CompareableValue(Number(d))
      })

      quickSorter.clearSnapshots()
      quickSorter.sort(series)
      this.quickSorterSnapshots = quickSorter.snapshots
    }
  },
  methods: {
    randomSeriesInput () {
      var seriesInput = ''
      this.snapshotIndex = 0
      window.clearInterval(this._interval)

      for (let i = 0; i < 40; i++) {
        seriesInput += ~~(Math.random() * 100)
        if (i < 39) {
          seriesInput += ','
        }
      }

      this.seriesInput = seriesInput
    },
    getSnapshot (snapshots, index) {
      if (snapshots && snapshots.length) {
        if (index >= snapshots.length) {
          index = snapshots.length - 1
        }

        var snapshot = snapshots[index]

        return snapshot.array
      }
      return []
    },
    play () {
      anime({
        targets: { snapshotIndex: 0 },
        snapshotIndex: this.maxIndex,
        duration: this.maxIndex * 100,
        update: (a) => {
          this.snapshotIndex = ~~a.animations[0].currentValue
        }
      })
    }
  },
  filters: {
    number (n) {
      return Number(n) < 10 ? '0' + n : n
    }
  },
  beforeMount () {
    this.randomSeriesInput()
  }
}
</script>

<style>
</style>
