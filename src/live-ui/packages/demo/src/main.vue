<template>
  <div>
    <h1>测试组件</h1>
    <span>{{age}}</span>
  </div>
</template>
<script>

export default {
  name: 'demo',
  props: {
    age: {
      type: Number,
      default () {
        return 123
      }
    }
  }
}
</script>
