<template>
  <div>
    <div class="shop-cart">
      <div class="content">
        <div class="content-left" @click="togglefold">
          <div class="logo-wrapper">
            <div class="circle-wrapper" :class="{'lineHeight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'lineHeight':totalCount>0}"></i>
            </div>
            <div class="number" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'lineHeight':totalCount>0}">￥{{totalPrice}}元</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" :class="{'lineHeight':totalPrice>=minPrice}">
          <div class="less-price" @click.stop.prevent="pay">{{minPriceShow}}</div>
        </div>
      </div>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="cart-detail" v-show="listshow">
          <div class="list-header clearfix border-1px">
            <div class="left-text">购物车</div>
            <div class="right-text" @click="empty">清空</div>
          </div>
          <div class="list-food" ref="listfood">
            <ul>
              <li v-for="selectfood in selectFoods" class="select-item border-1px">
                <h1 class="name">{{selectfood.name}}</h1>
                <span class="price">{{selectfood.price*selectfood.count}}</span>
                <div class="cartcontrol-wrapper">
                  <cartControl :food="selectfood"></cartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="openmask" v-show="listshow" @click="hideList"></div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import cartControl from '../cartControl/cartControl';
  import Bscroll from 'better-scroll';
  export default{
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default(){
          return [];
        }
      }
    },
    data(){
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
      }
    },
    computed: {
      listshow(){
        if (!this.totalCount) {
          this.fold = true;
          return false
        }
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new Bscroll(this.$refs.listfood, {
                click: true
              })
            } else {
              this.scroll.refresh();
            }
          })
        }
        return show;
      },
      totalPrice(){
        let price = 0;
        for (let i = 0; i < this.selectFoods.length; i++) {
          price += this.selectFoods[i].price * this.selectFoods[i].count
        }
        return price;
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach(function (item) {
          count += item.count;
        });
        return count;
      },
      minPriceShow(){
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let subPrice = this.minPrice - this.totalPrice;
          return `还差￥${subPrice}元起送`
        } else {
          return '去结算'
        }
      }
    },
    methods: {
      togglefold(){
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      drop(el){
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el){
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let ret = ball.el.getBoundingClientRect();
            let x = ret.left - 32;
            let y = -(window.innerHeight - ret.top - 22);
            el.style.display = '';
            el.style.transform = `translate3d(0,${y}px,0)`;
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.transform = `translate3d(${x}px,0,0)`;
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el){
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.transform = 'translate3d(0,0,0)';
          el.style.webkitTransform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.transform = 'translate3d(0,0,0)';
          inner.style.webkitTransform = 'translate3d(0,0,0)';
        })
      },
      afterEnter(el){
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      empty(){
        this.selectFoods.forEach((food) => {
          food.count = 0;
        })
      },
      hideList(){
          this.fold = true;
      },
      pay(){
          if(this.totalPrice < this.minPrice){
              return;
          }
          window.alert(`支付${this.totalPrice}元`)
      }
    },
    components: {
      cartControl
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl'
  .shop-cart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    height: 50px
    width: 100%
    .content
      background-color: #141d27
      display: flex
      .content-left
        flex: 1
        font-size: 0
        .logo-wrapper
          position: relative
          top: -6px
          display: inline-block
          width: 56px
          height: 56px
          border-radius: 50%
          margin: 0 12px
          padding: 6px
          box-sizing: border-box
          background-color: #141d27
          .circle-wrapper
            width: 100%
            height: 100%
            border-radius: 50%
            background-color: #2b343c
            text-align: center
            &.lineHeight
              background-color: #00a0dc
            .icon-shopping_cart
              color: #80858a
              font-size: 24px
              line-height: 44px
              &.lineHeight
                color: rgb(255, 255, 255)
          .number
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            border-radius: 6px
            text-align: center
            background-color: rgb(240, 20, 20)
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
            color: rgb(255, 255, 255)
            font-size: 9px
            font-weight: 700
            line-height: 16px
        .price
          display: inline-block
          vertical-align: top
          font-size: 16px
          font-weight: 700
          line-height: 24px
          margin-top: 12px
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          color: rgba(255, 255, 255, 0.4)
          &.lineHeight
            color: rgb(255, 255, 255)
        .desc
          display: inline-block
          vertical-align: top
          margin-top: 12px
          margin-left: 12px
          font-size: 10px
          color: rgba(255, 255, 255, 0.4)
          line-height: 24px
      .content-right
        flex: 0 0 105px
        width: 105px
        background-color: #2b333b
        &.lineHeight
          background-color: #00b43c
          .less-price
            color: rgb(255, 255, 255)
        .less-price
          font-size: 12px
          font-weight: 700
          line-height: 24px
          padding-top: 12px
          text-align: center
          color: rgba(255, 255, 255, 0.4)
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 999
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background-color: rgb(0, 160, 220)
          transition: all 0.4s linear
    .cart-detail
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      font-size: 0
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transtion: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        padding: 0 18px
        background-color: #f3f5f7;
        box-sizing: border-box
        width: 100%
        border-1px(rgba(7, 17, 27, 0.1))
        .left-text
          float: left
          font-size: 14px
          line-height: 40px
          color: rgb(7, 17, 27)
        .right-text
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
          line-height: 40px
      .list-food
        background-color: rgb(255, 255, 255)
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        .select-item
          border-1px(rgba(7, 17, 27, 0.1))
          padding: 12px 0
          position: relative
          .name
            font-size: 14px
            color: rgb(7, 17, 27)
            line-height: 24px
          .price
            position: absolute
            top: 12px
            right: 90px
            font-size: 10px
            font-weight: 700
            color: rgb(240, 20, 20)
            line-height: 24px
          .cartcontrol-wrapper
            position: absolute
            right: 0
            top: 6px

  .openmask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    background-color: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      background-color: rgba(7, 17, 27, 0)
</style>
