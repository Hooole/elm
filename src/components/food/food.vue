<template>
  <transition name="foodfade">
    <div class="food" v-show="showflag" ref="foodScroll">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" class="img"/>
          <div class="icon-wrapper">
            <i class="icon-arrow_lift" @click="hide"></i>
          </div>
        </div>
        <div class="content">
          <div class="main">
            <h1 class="title">{{food.name}}</h1>
            <div class="count-rating">
              <span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price-old">
              <span class="price">￥{{food.price}}</span>
              <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
          </div>
          <div class="cart-wrapper" v-show="food.count">
            <cartControl :food="food" @increment="incrementTotal"></cartControl>
          </div>
          <!--<transition name="textfade">-->
          <div class="cart-shop" v-show="!food.count||food.count==0" @click.stop.prevent="addcart">
            <span class="text">加入购物车</span>
          </div>
          <!--</transition>-->
        </div>
        <div v-show="food.info">
          <div class="splitwrapper">
            <split></split>
          </div>
          <div class="intr-food">
            <h1 class="title">商品介绍</h1>
            <p class="text">{{food.info}}</p>
          </div>
        </div>
        <div class="splitwrapper">
          <split></split>
        </div>
        <div class="food-rating">
          <h1 class="title">商品评价</h1>
          <div class="ratingwrapper">
            <ratingselect :ratings="food.ratings" @select="selectRating" @toggle="toggleContent"
                          :selectType="selectType" :rateType="rateType" :onlyContent="onlyContent"></ratingselect>
          </div>
        </div>
        <div class="rating-content">
          <ul class="rating-box" v-show="food.ratings && food.ratings.length">
            <li v-for="rating in food.ratings" class="rating-list" v-show="newShow(rating.rateType,rating.text)">
              <div class="time"><span>{{rating.rateTime | formatDate}}</span></div>
              <div class="text">
                <i :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"
                   class="icon"></i><span class="text">{{rating.text}}</span>
              </div>
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img :src="rating.avatar" class="avatar" width="12" height="12"/>
              </div>
            </li>
          </ul>
          <div class="norating" v-show="!food.ratings || !food.ratings.length">
            暂时没有评论
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  import {formatDate} from '../../common/js/date'
  import Vue from 'vue';
  import cartControl from '../cartControl/cartControl';
  import split from '../split/split';
  import ratingselect from '../ratingselect/ratingselect';

  const all = 2;
  export default{
    props: {
      food: {
        type: Object
      }
    },
    data(){
      return {
        showflag: false,
        selectType: all,
        rateType: {
          all: '全部',
          like: '推荐',
          hate: '吐槽'
        },
        onlyContent: false
      }
    },
    methods: {
      show(){
        this.showflag = true;
        this.selectType = all;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new Bscroll(this.$refs.foodScroll, {
              click: true
            })
          } else {
            this.foodScroll.refresh();
          }
        })
      },
      hide(){
        this.showflag = false;
      },
      addcart(event){
        if (!event._constructed) {
          return
        }
        console.log(event.target);
        this.$emit('increment', event.target)//子组件通过$emit触发父组件的increment方法
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      incrementTotal(target){
        this.$emit('increment', target)
      },
      selectRating(type){
        this.selectType = type;
        this.$nextTick(() => {
          this.foodScroll.refresh();
        })
      },
      toggleContent(){
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.foodScroll.refresh();
        })
      },
      newShow(type, text){
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === all) {
          return true
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: {
      formatDate(time){
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      cartControl,
      split,
      ratingselect
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    bottom: 50px
    left: 0
    width: 100%
    height: 100%
    z-index: 30
    background-color: #ffffff
    transform: translate3d(0, 0, 0)
    &.foodfade-enter-active, &.foodfade-leave-active
      transition: all 0.2s
    &.foodfade-enter, &.foodfade-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      width: 100%
      height: 0
      padding-bottom: 100%
      position: relative
      .img
        display: inline-block
        width: 100%
        height: 100%
        position: absolute
        top: 0
        left: 0
      .icon-wrapper
        position: absolute
        top: 60px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px

    .content
      position: relative
      .main
        padding: 0 18px
        .title
          margin-top: 18px
          font-weight: 700
          color: rgb(7, 17, 27)
          line-height: 14px
          font-size: 14px
        .count-rating
          margin-top: 8px
          color: rgb(147, 153, 159)
          line-height: 10px
          font-size: 10px
          .sellCount
            margin-right: 12px
        .price-old
          margin-top: 18px
          .price
            color: rgb(240, 20, 20)
            line-height: 24px
            font-weight: 700
            font-size: 14px
          .oldPrice
            color: rgb(147, 153, 159)
            font-weight: 700
            line-height: 24px
            font-size: 10px
      .cart-wrapper
        position: absolute
        right: 16px
        top: 50px
      .cart-shop
        position: absolute
        right: 18px
        top: 55px
        width: 74px
        height: 24px
        border-radius: 12px
        background-color: rgb(0, 160, 220)
        text-align: center
        &.textfade-enter-active, &.textfade-leave-active
          transition: all 0.2s
        &.textfade-enter, &.textfade-leave-active
          z-index: -1
          opacity: 0
        .text
          font-size: 10px
          color: rgb(255, 255, 255)
          line-height: 24px
    .splitwrapper
      margin-top: 18px
    .intr-food
      padding: 0 18px
      .title
        margin-top: 18px
        line-height: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
        font-size: 14px
      .text
        padding: 0 8px
        font-weight: 200
        margin-top: 6px
        color: rgb(77, 85, 93)
        line-height: 24px
        font-size: 12px
    .food-rating
      .title
        margin-top: 18px
        line-height: 14px
        padding: 0 18px
        font-weight: 700
        color: rgb(7, 17, 27)
        font-size: 14px
      .ratingwrapper
        margin-top: 18px
    .rating-list
      padding: 16px 18px
      position: relative
      .time
        color: rgb(147, 153, 159)
        line-height: 12px
        font-size: 12px
      .text
        margin-top: 6px
        .icon
          line-height: 24px
          font-size: 12px
          &.icon-thumb_down
            color: rgb(147, 153, 159)
          &.icon-thumb_up
            color: rgb(0, 160, 220)
        .text
          line-height: 16px
          margin-left: 4px
          color: rgb(7, 17, 27)
          font-size: 12px
      .user
        position: absolute
        right: 18px
        top: 18px
        font-size: 0
        .name
          display: inline-block
          vertical-align: top
          margin-right: 6px
          color: rgb(147, 153, 159)
          line-height: 12px
          font-size: 10px
        .avatar
          display: inline-block
          vertical-align: top
    .norating
      padding: 18px 16px
      font-size: 12px
</style>
