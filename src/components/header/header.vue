<template>
  <div class="header">
    <div class="header-top">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="total" v-if="seller.supports" @click="showDetail">
        <span class="numsupport">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="header-bottom" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="header-bg">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <transition name="slide-fade">
      <div class="detail" v-show="detailShow" transition="fade">
        <div class="detail-wrapper clearfix">
          <div class="detail-contnet">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li v-for="item in seller.supports" class="item">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <p class="bulletin">{{seller.bulletin}}</p>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>
<script type="text/ecmascript-6">
  import star from '../star/star.vue';

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
        return{
            detailShow:false
        }
    },
    methods:{
      showDetail() {
          this.detailShow = true;
      },
      closeDetail(){
          this.detailShow = false;
      }
    },
    created (){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components:{
        star
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    color: #ffffff
    background-color: rgba(7, 17, 27, 0.5)
    position: relative
    overflow: hidden
    .header-top
      padding: 24px 12px 18px 24px
      font-size: 0
      position: relative
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            margin-right: 6px
            width: 30px
            height: 18px
            bg-img('brand')
            background-size: 30px 18px
            background-repeat no-repeat
          .name
            font-size: 16px
            font-weight: bold
            line-height: 18px
        .description
          font-size: 12px
          line-height: 12px
        .supports
          margin-top: 10px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.invoice
              bg-img('invoice_1')
            &.special
              bg-img('special_1')
          .text
            font-size: 10px
            line-height: 12px
      .total
        position: absolute
        right: 12px
        bottom: 16px
        padding: 6px 8px
        border-radius: 24px
        text-align: center
        background-color: rgba(0, 0, 0, 0.2)
        .numsupport
          font-size: 10px
          line-height: 12px
          vertical-align: top
        .icon-keyboard_arrow_right
          font-size: 10px
          line-height: 12px

    .header-bottom
      position: relative
      padding: 0 21px 0 12px
      height: 28px
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      background-color: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: 7px
        margin-right: 4px
        width: 22px
        height: 12px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        font-size: 10px
        line-height: 28px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        top: 8px
        right: 12px

    .header-bg
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      z-index: -1
      filter: blur(10px)
      -webkit-filter: blur(10px)
    .detail
      position: fixed
      top:0
      left:0
      z-index:99
      width:100%
      height:100%
      background-color :rgba(7,17,27,0.8)
      backdrop-filter:blur(10px)
      &.slide-fade-enter-active,&.slide-fade-leave-active
        transition :all .5s
      &.slide-fade-enter,&.slide-fade-leave-active
        opacity :0
        background-color :rgba(7,17,27,0)
      overflow :auto
      .detail-wrapper
        min-height:100%
        width:100%
        .detail-contnet
          padding:64px 36px 64px
          .name
            font-size: 16px
            font-weight:700
            line-height:16px
            text-align :center
          .star-wrapper
            text-align:center
            padding-top:18px
          .title
            display :flex
            width:100%
            padding-top:28px
            .line
              flex:1
              position :relative
              top:-7px
              border-bottom :1px solid rgba(255,255,255,0.2)
            .text
              padding:0 12px
              font-size:14px
              font-weight:700
          .supports
            width:100%
            padding:24px 12px 0
            box-sizing:border-box
            .item
              margin-bottom:12px
              font-size:0
              &:last-child
                margin-bottom:0
              .icon
                display:inline-block
                width: 16px
                height:16px
                vertical-align :top
                background-size :16px 16px
                background-repeat :no-repeat
                margin-right:6px
                &.decrease
                  bg-img('decrease_2')
                &.discount
                  bg-img('discount_2')
                &.guarantee
                  bg-img('guarantee_2')
                &.invoice
                  bg-img('invoice_2')
                &.special
                  bg-img('special_2')
              .text
                font-size:12px
                line-height:16px
          .bulletin
            margin-top: 24px
            font-size:12px
            line-height:24px
            padding:0 12px
            box-sizing:border-box
      .detail-close
        position :relative
        margin:-64px auto 0 auto
        width:32px
        height:32px
        clear:both
        font-size:32px
</style>
