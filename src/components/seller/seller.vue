<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="place border-1px">
        <div class="place-top border-1px">
          <h1 class="title">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
          </div>
          <div class="num">
            <span class="ratingCount">({{seller.ratingCount}})</span>
            <span class="sellCount">月售{{seller.sellCount}}单</span>
          </div>
        </div>
        <div class="favor" @click="favorToggle">
          <i class="icon-favorite" :class="{'favorselect':favorselect}"></i>
          <p class="title">{{favorTitle}}</p>
        </div>
      </div>
      <div class="somenum">
        <div class="minPrice">
          <h1 class="title">起送价</h1>
          <p class="num">{{seller.minPrice}}<span class="one">元</span></p>
        </div>
        <div class="deliveryPrice">
          <h1 class="title">{{seller.description}}</h1>
          <p class="num">{{seller.deliveryPrice}}<span class="one">元</span></p>
        </div>
        <div class="deliveryTime">
          <h1 class="title">平均配送时间</h1>
          <p class="num">{{seller.deliveryTime}}<span class="one">分钟</span></p>
        </div>
      </div>
      <div class="split-wrapper">
        <split></split>
      </div>
      <div class="activi">
        <div class="desc border-1px">
          <h1 class="title">公告与活动</h1>
          <p class="text">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li v-for="item in seller.supports" class="item">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <div class="split-wrapper">
        <split></split>
      </div>
      <div class="scenery" v-show="seller.pics && seller.pics.length">
        <h1 class="title">商家实景</h1>
        <div class="Box" ref="box">
          <ul class="picbox" ref="picbox">
            <li class="piclist" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90"/>
            </li>
          </ul>
        </div>
      </div>
      <div class="split-wrapper">
        <split></split>
      </div>
      <div class="infos">
        <h1 class="title">商家信息</h1>
        <ul class="infoBox">
          <li class="infolist border-1px" v-for="info in seller.infos">
            <p class="text">{{info}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  import star from '../star/star';
  import split from '../split/split';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        favorselect: false
      }
    },
    watch:{
      'seller'(){
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        })
      }
    },
    computed: {
      favorTitle(){
        return this.favorselect ? '已收藏' : '收藏'
      }
    },
    mounted(){
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      })
    },
    created (){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      _initScroll(){
        if (!this.sellerScroll) {
          this.sellerScroll = new Bscroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.sellerScroll.refresh();
        }
      },
      _initPics(){
        if (this.seller.pics && this.seller.pics.length) {
          let picWidth = 120;
          let num = this.seller.pics.length;
          let width = picWidth * num + 6 * (num - 1);
          this.$refs.picbox.style.width = width + 'px';
          if (!this.picScroll) {
            this.picScroll = new Bscroll(this.$refs.box, {
              scrollX: true
            })
          } else {
            this.picScroll.refresh();
          }
        }
      },
      favorToggle(event){
        if (!event._constructed) {
          return
        }
        this.favorselect = !this.favorselect;
      }
    },
    components: {
      star,
      split
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 172px
    bottom: 0
    overflow: hidden
    width: 100%
    .place
      padding: 0 18px
      position: relative
      font-size: 0
      .place-top
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          line-height: 14px
          margin-bottom: 8px
          color: rgb(7, 17, 27)
          font-size: 14px
        .star-wrapper
          display: inline-block
          vertical-align: top
        .num
          display: inline-block
          vertical-align: top
          margin-left: 8px
          line-height: 18px
          color: rgb(77, 85, 93)
          font-size: 10px
          .ratingCount
            margin-right: 12px
      .favor
        position: absolute
        width: 40px
        right: 18px
        top: 12px
        text-align: center
        .icon-favorite
          line-height: 24px
          font-size: 24px
          color: rgb(77, 85, 93)
          &.favorselect
            color: rgb(240, 20, 20)
        .title
          line-height: 10px
          margin-top: 4px
          font-size: 10px
          color: rgb(77, 85, 93)
    .somenum
      display: flex
      padding: 18px 18px
      .minPrice
        flex: 1
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
      .deliveryPrice
        flex: 1
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
      .deliveryTime
        flex: 1
        text-align: center
      .title
        line-height: 10px
        color: rgb(147, 153, 159)
        font-size: 10px
        margin-bottom: 4px
      .num
        line-height: 24px
        color: rgb(7, 17, 27)
        font-size: 24px
        .one
          font-size: 10px
    .activi
      padding: 18px 18px 0
      .desc
        padding-bottom: 16px
        border-1px(rgba(7, 17, 27, 0.1))
        .title
          line-height: 14px
          color: rgb(7, 17, 27)
          font-size: 14px
        .text
          margin-top: 8px
          padding: 0 12px
          line-height: 24px
          color: rgb(240, 20, 20)
          font-size: 12px
    .supports
      width: 100%
      padding: 24px 12px 0
      box-sizing: border-box
      .item
        padding: 16px 0
        font-size: 0
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .icon
          display: inline-block
          width: 16px
          height: 16px
          vertical-align: top
          background-size: 16px 16px
          background-repeat: no-repeat
          margin-right: 6px
          &.decrease
            bg-img('decrease_4')
          &.discount
            bg-img('discount_4')
          &.guarantee
            bg-img('guarantee_4')
          &.invoice
            bg-img('invoice_4')
          &.special
            bg-img('special_4')
        .text
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 16px
    .scenery
      padding: 18px 0 18px 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        color: rgb(7, 17, 27)
        font-size: 14px
      .Box
        overflow: hidden
        white-space: nowrap
        .picbox
          .piclist
            display: inline-block
            margin-right: 6px
            &:last-child
              margin-right: 0
    .infos
      padding: 18px 18px 0 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        color: rgb(7, 17, 27)
        font-size: 14px
      .infolist
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .text
          line-height: 16px
          color: rgb(7, 17, 27)
          font-size: 12px
</style>
