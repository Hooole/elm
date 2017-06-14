<template>
  <div class="cartControl">
    <transition name="decr">
      <div class="cart-decrease" v-show="food.count" @click.stop.prevent="decreaseCart">
        <transition name="inner">
          <i class="inner icon-remove_circle_outline"></i>
        </transition>
      </div>
    </transition>
    <div class="cart-num" v-show="food.count">{{food.count}}</div>
    <div class="cart-add">
      <i class="icon-add_circle" @click.stop.prevent="addCart"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default{
    props: {
      food: {
        type: Object
      }
    },
    created(){
    },
    methods: {
      addCart(event){
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        };
        console.log(event.target);
        this.$emit('increment', event.target);//子组件通过$emit触发父组件的increment方法
      },
      decreaseCart(event){
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--;
        } else {
          this.food.count = 0;
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cartControl
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      &.decr-enter-active, &.decr-leave-active
        transition: all .5s linear
      &.decr-enter, &.decr-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
      .inner
        display: inline-block
        font-size: 24px
        line-height: 24px
        color: rgb(0, 160, 220)
        vertical-align: top
        &.inner-enter-active, &.inner-leave-active
          transition: all .5s linear
          transform: rotate(0)
        &.inner-enter, &.inner-leave-active
          opacity: 0
          transform: rotate(180deg)
    .cart-num
      display: inline-block
      font-size: 10px
      color: rgb(147, 153, 159)
      line-height: 24px
      vertical-align: top
      margin-top: 6px
      width: 12px
      text-align: center
    .cart-add
      display: inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
      vertical-align: top
</style>
