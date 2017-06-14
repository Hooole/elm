<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuwrapper">
        <ul class="menu">
          <li v-for="(good,index) in goods" @click="selectMenu(index,$event)" class="border-1px menu-item"
              :class="{'current':currentIndex==index}">
          <span class="text">
            <span v-show="good.type>0" class="icon" :class="classMap[good.type]"></span>{{good.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodswrapper">
        <ul>
          <li v-for="good in goods" class="food-list-hook">
            <h2 class="title">{{good.name}}</h2>
            <ul>
              <li v-for="item in good.foods" class="good-list border-1px" @click="selectFood(item,$event)">
                <div class="food-img">
                  <img :src="item.icon" class="image" width="57" height="57"/>
                </div>
                <div class="name-descr">
                  <h2 class="name">{{item.name}}</h2>
                  <p class="description">{{item.description}}</p>
                  <div class="count-rating">
                    <span class="sellCount">月售{{item.sellCount}}份</span><span class="rating">好评率{{item.rating}}%</span>
                  </div>
                  <div class="price-old">
                    <span class="price">￥{{item.price}}</span>
                    <span class="oldPrice" v-show="item.oldPrice">{{item.oldPrice}}</span>
                  </div>
                  <div class="cartwrapper">
                    <cartControl :food="item" @increment="incrementTotal"></cartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"
                ref="shopCart"></shopcart>
    </div>
    <food :food="selectedFood" ref="clickfood" @increment="incrementTotal"></food>
  </div>
</template>
<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart';
  import cartControl from '../cartControl/cartControl';
  import food from '../food/food';
  const errok = 0;
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        currentHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    created(){
      this.$http.get('/api/goods').then(response => {
        response = response.body;
        if (response.errno === errok) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          })
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    computed: {
      currentIndex(){
        for (let i = 0; i < this.currentHeight.length; i++) {
          let height1 = this.currentHeight[i];
          let height2 = this.currentHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0;
      },
      selectFoods(){
        let foods = [];
        this.goods.forEach(function (item) {
          item.foods.forEach(function (food) {
            if (food.count) {
              foods.push(food)
            }
          })
        });
        return foods;
      }
    },
    methods: {
      selectMenu(index, event){
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
        this.goodsScroll.scrollToElement(foodList[index], 500);
      },
      _initScroll(){
        //console.log(this.$refs.menuwrapper);
        this.menuScroll = new Bscroll(this.$refs.menuwrapper, {
          click: true
        });
        this.goodsScroll = new Bscroll(this.$refs.foodswrapper, {
          probeType: 3,
          click: true
        });
        this.goodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight(){
        let height = 0;
        this.currentHeight.push(height);
        let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook');
        for (let i = 0; i < foodList.length; i++) {
          height += foodList[i].clientHeight;
          this.currentHeight.push(height);
        }
      },
      _drop(target){
        //优化性能，异步执行
        this.$nextTick(() => {
          this.$refs.shopCart.drop(target);
        })
      },
      incrementTotal(target){
        console.log(target);
        this._drop(target)
      },
      selectFood(food, event){
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.clickfood.show();
      }
    },
    components: {
      shopcart,
      cartControl,
      food
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 50px
    overflow: hidden
    width: 100%
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        height: 54px
        display: table
        vertical-align: middle
        border-1px(rgba(7, 17, 27, 0.1))
        &.current
          position: relative
          margin-top: -1px
          z-index: 2
          background-color: #ffffff
          border-none()
        .text
          display: table-cell
          vertical-align: middle
          line-height: 14px
          width: 56px;
          padding: 0 12px
          font-size: 12px
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_3')
            &.discount
              bg-img('discount_3')
            &.guarantee
              bg-img('guarantee_3')
            &.invoice
              bg-img('invoice_3')
            &.special
              bg-img('special_3')
    .foods-wrapper
      flex: 1
      .title
        height: 26px
        line-height: 26px
        color: rgb(147, 153, 159)
        background-color: #f3f5f7
        border-left: 2px solid #d9dde1
        padding-left: 14px
        font-size: 12px
      .good-list
        font-size: 0
        padding: 18px 18px
        border-1px(rgba(7, 17, 27, 0.1))
        display: flex
        &:last-child
          border-none()
        .food-img
          margin-right: 10px
          flex: 0 0 57px
          width: 57px
        .name-descr
          flex: 1
          font-size: 14px
          .name
            margin-top: 2px
            color: rgb(7, 17, 27)
            line-height: 14px
            font-size: 14px
          .description
            margin-top: 8px
            color: rgb(147, 153, 159)
            line-height: 12px
            font-size: 10px
          .count-rating
            margin-top: 8px
            color: rgb(147, 153, 159)
            line-height: 10px
            font-size: 10px
            .rating
              margin-left: 12px
          .price
            color: rgb(240, 20, 20)
            font-weight: 700
            line-height: 24px
            font-size: 14px
          .oldPrice
            color: rgb(147, 153, 159)
            font-weight: 700
            line-height: 24px
            font-size: 10px
        .cartwrapper
          position: absolute
          right: 18px
          bottom: 12px
</style>
