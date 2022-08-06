<template>
  <div>
    <div style="padding-top: 46px" v-if="this.$route.meta.rentShow">
      <!-- 头部 -->
      <van-nav-bar
        class="title"
        title="房屋管理"
        left-arrow
        @click-left="onClickLeft"
        fixed
      />
      <!-- 列表 -->
      <ul>
        <li class="list-item" v-for="item in RentList" :key="item.houseCode">
          <div class="left">
            <img :src="`http://liufusong.top:8080${item.houseImg}`" alt="" />
          </div>
          <div class="right">
            <h3 class="house-title">{{ item.title }}</h3>
            <div class="house-info">{{ item.desc }}</div>
            <div
              class="house-transport"
              v-for="(tag, index) in item.tags"
              :key="index"
            >
              <span>{{ tag }}</span>
            </div>
            <div class="house-price">
              <span>{{ item.price }}</span> 元/月
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 房屋出租 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { getRentApi } from "@/api";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Rent",
  data() {
    return {
      RentList: [],
    };
  },
  methods: {
    // 左上箭头返回
    onClickLeft() {
      this.$router.push({
        path: "/home/profile",
      });
    },
    // 获取收藏列表
    async getRent() {
      try {
        const res = await getRentApi();
        // console.log(res);
        this.RentList = res.data.body;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getRent();
  },
};
</script>

<style scoped lang="less">
.title {
  background-color: #21b97a;
}
:deep(.title) {
  .van-nav-bar__title {
    color: #fff;
    font-size: 18px;
  }
  .van-icon-arrow-left {
    color: #fff;
  }
}
// 列表区域样式
.list-item {
  height: 120px;
  width: 100%;
  padding: 18px 15px 0;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  .left {
    flex: 1;
    width: 100%;
    img {
      width: 100%;
      height: 80px;
    }
  }
  .right {
    flex: 2.25;
    padding-left: 12px;
    .house-title {
      margin: 0;
      font-size: 15px;
      line-height: 22px;
      color: #394043;
    }
    .house-info {
      font-size: 12px;
      line-height: 22px;
      color: #afb2b3;
    }
    .house-transport {
      margin-top: 5px;
      line-height: 12px;
      span {
        padding: 2px 5px;
        background: #e1f5f8;
        font-size: 12px;
        color: #39becd;
        border-radius: 3px;
      }
    }
    .house-price {
      font-size: 12px;
      color: #fa5741;
      line-height: 22px;
      margin-top: 5px;
      span {
        font-size: 16px;
        font-weight: bolder;
      }
    }
  }
}
</style>
