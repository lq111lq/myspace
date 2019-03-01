<template>
  <div class="bars">
    <div
      class="bar"
      v-for="(item,i) in snapshot"
      :key="i"
      :style="{
        left: i * 30 + 'px',
        'padding-top': item.value + 'px',
        height: (20 + item.value) + 'px'
      }"
    >
      <span>{{item.value|number}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SorterSnapshot',
  props: {
    snapshot: {
      type: Array,
      default: null
    }
  },
  filters: {
    number (n) {
      return Number(n) < 10 ? '0' + n : n
    }
  }
}
</script>

<style scoped>
.bars {
  position: relative;
  height: 150px;
}

.bar {
  position: absolute;
  bottom: 0px;
  background: currentcolor;
  width: 20px;
  text-align: center;
}

.bar span {
  color: white;
  font-size: 12px;
}
</style>
