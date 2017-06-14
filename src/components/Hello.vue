<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Hoole</h2>
    <button v-on:click="sayHello">点击</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '这是test',
      sayHello:function () {
        alert(1);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">

</style>
