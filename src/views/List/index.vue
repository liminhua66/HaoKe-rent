<template>
  <div>
    <!-- 搜索框 -->
    <van-nav-bar class="title" left-arrow @click-left="onClickLeft" />
    <van-search
      v-model="value"
      show-action
      placeholder="请输入小区或地址"
      @search="onSearch"
    >
      <template #label>
        <div @click="onSearch" class="icon-arrowdown">
          北京
          <span class="iconfont icon-arrow font-arrow"></span>
        </div>
      </template>
      <template #action>
        <div @click="onSearch">
          <i class="iconfont icon-map"></i>
        </div>
      </template>
    </van-search>
    <!-- 筛选 -->
    <div class="filter">
      <div
        class="filter-item"
        :class="{ current: currentIndex }"
        @click="currentIndex = !currentIndex"
      >
        <span>区域</span>
        <i class="iconfont icon-arrow"></i>
      </div>
      <div
        class="filter-item"
        :class="{ current: currentIndex }"
        @click="currentIndex = !currentIndex"
      >
        <span>方式</span>
        <i class="iconfont icon-arrow"></i>
      </div>
      <div
        class="filter-item"
        :class="{ current: currentIndex }"
        @click="currentIndex = !currentIndex"
      >
        <span>租金</span>
        <i class="iconfont icon-arrow"></i>
      </div>
      <div
        class="filter-item"
        :class="{ current: currentIndex }"
        @click="currentIndex = !currentIndex"
      >
        <span>筛选</span>
        <i class="iconfont icon-arrow"></i>
      </div>
    </div>
    <van-picker :columns="columns" v-if="false" />
    <!-- 列表 -->
    <ul>
      <li class="list-item" v-for="item in houseList" :key="item.houseCode">
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
</template>

<script>
import { getHouseApi } from "@/api";
export default {
  name: "List",
  data() {
    return {
      value: "",
      currentIndex: true,
      columns: [
        {
          text: "浙江",
          children: [
            {
              text: "杭州",
              children: [{ text: "西湖区" }, { text: "余杭区" }],
            },
            {
              text: "温州",
              children: [{ text: "鹿城区" }, { text: "瓯海区" }],
            },
          ],
        },
        {
          text: "福建",
          children: [
            {
              text: "福州",
              children: [{ text: "鼓楼区" }, { text: "台江区" }],
            },
            {
              text: "厦门",
              children: [{ text: "思明区" }, { text: "海沧区" }],
            },
          ],
        },
      ],
      houseList: [],
    };
  },
  methods: {
    // 搜索功能，待定义
    onSearch() {},
    // 左上箭头返回
    onClickLeft() {
      this.$router.go(-1);
    },
    current() {},
    // 获取所有的列表数据
    async getList() {
      const res = await getHouseApi();
      console.log(res);
      this.houseList = res.data.body.list;
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped lang="less">
// 头部区域样式
:deep(.title) {
  height: 50px;
  background-color: #21b97a;
  .van-nav-bar__left {
    color: #fff;
    font-size: 16px;
    padding: 2px 16px 0 7px;
    align-items: center;
  }
  .van-icon {
    color: #fff;
    font-size: 22px;
  }
}
:deep(.van-search) {
  position: absolute;
  top: 5px;
  left: 45px;
  width: 84%;
  padding: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0);
  .van-search__content {
    padding-left: 4px;
  }
}
.icon-map {
  font-size: 25px;
  color: #fff;
  position: relative;
  top: 3px;
  right: -2px;
}
.font-arrow {
  border-right: 1px solid #939394;
  font-size: 12px;
  padding-right: 10px;
}
// 筛选区域样式
.filter {
  display: flex;
  height: 40px;
  align-items: center;
  border-bottom: 1px solid #eee;
  .current {
    i,
    span {
      color: #21b97a !important;
    }
  }
  .filter-item {
    flex: 1;
    text-align: center;
    i {
      font-size: 12px;
      margin-left: 3px;
      color: #bbb;
      margin-left: 4px;
    }
    span {
      font-size: 17px;
      color: #333;
    }
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
