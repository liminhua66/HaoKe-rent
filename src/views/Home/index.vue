<template>
  <div>
    <!-- 搜索头部 -->
    <van-search
      v-model="value"
      show-action
      label="北京"
      placeholder="请输入小区或地址"
      @search="onSearch"
      left-icon="arrow-down"
    >
      <template #action>
        <div @click="onSearch">
          <i class="iconfont icon-map"></i>
        </div>
      </template>
    </van-search>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in swiperList" :key="item.id">
        <van-image
          width="100%"
          height="100%"
          :src="`http://liufusong.top:8080${item.imgSrc}`"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 四个图标路由跳转 -->
    <div class="nav_flex">
      <div class="nav_item">
        <img src="../../assets/imgs/2.png" alt="" />
        <p>整租</p>
      </div>
      <div class="nav_item">
        <img src="../../assets/imgs/4.png" alt="" />
        <p>合租</p>
      </div>
      <div class="nav_item">
        <img src="../../assets/imgs/3.png" alt="" />
        <p>地图找房</p>
      </div>
      <div class="nav_item">
        <img src="../../assets/imgs/1.png" alt="" />
        <p>去出租</p>
      </div>
    </div>
    <!-- 租房小组模块 -->
    <div class="group">
      <h3 class="group-title">
        租房小组
        <span class="more">更多</span>
      </h3>
      <div class="grid">
        <div class="grid_item" v-for="item in groupsList" :key="item.id">
          <img
            class="left"
            :src="`http://liufusong.top:8080${item.imgSrc}`"
            alt=""
          />
          <div class="right">
            <p>{{ item.title }}</p>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
    <!-- 底部切换模块 -->
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/home/list" icon="search">找房</van-tabbar-item>
      <van-tabbar-item to="/home/news" icon="newspaper-o">资讯</van-tabbar-item>
      <van-tabbar-item to="/home/profile" icon="user-circle-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { getSwiperApi, getRentGroupsApi } from "@/api";
export default {
  data() {
    return {
      active: 0,
      value: "",
      swiperList: [],
      groupsList: [],
    };
  },
  methods: {
    // 发送请求，获取轮播图数据
    async getSwiperList() {
      const res = await getSwiperApi();
      this.swiperList = res.data.body;
    },
    // 发送请求，获取租房小组数据
    async getRentGroups() {
      const res = await getRentGroupsApi();
      console.log(res);
      this.groupsList = res.data.body;
    },

    // 搜索vant自带，功能待定义
    onSearch() {},
  },
  mounted() {
    this.getSwiperList();
    this.getRentGroups();
  },
};
</script>

<style scoped lang="less">
.van-search {
  position: absolute;
  top: 25px;
  width: 100%;
  padding: 0 10px;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0);
}
.my-swipe .van-swipe-item {
  width: 375px;
  height: 212px;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.icon-map {
  color: #fff;
}
// 四个图片路由跳转区域样式
.nav_flex {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 122px;
  .nav_item {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    img {
      width: 60px;
      height: 60px;
      margin-bottom: 8px;
    }
  }
}
// 租房小组模块样式
.group {
  background-color: #f6f5f6;
  padding: 0 10px;
  height: 187px;
  overflow: hidden;
  .group-title {
    position: relative;
    margin: 15px 0 15px 10px;
    font-size: 15px;
    .more {
      color: #787d82;
      position: absolute;
      right: 0;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .grid {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .grid_item {
      display: flex;
      align-items: center;
      width: 49%;
      height: 60px;
      background: #fff;
      margin-bottom: 10px;
      .left {
        width: 50px;
        height: 50px;
        margin: 0 10px;
      }
      .right {
        font-size: 14px;
      }
    }
  }
}
</style>
