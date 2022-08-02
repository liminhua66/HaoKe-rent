<template>
  <div style="padding-top: 46px">
    <!-- 头部 -->
    <van-nav-bar
      class="title"
      title="城市列表"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <!-- 城市列表 -->
    <van-index-bar :index-list="letterList" :sticky="false">
      <div v-for="(item, index) in newList" :key="index">
        <van-index-anchor :index="index">{{ item.title }}</van-index-anchor>
        <div v-for="(c, index) in item.city" :key="index">
          <van-cell :title="c.label" @click="clickCity" />
        </div>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCityApi, getHotCityApi } from "@/api";
export default {
  name: "CityA",
  data() {
    return {
      cityList: [],
      letterList: [],
      newList: [],
      clickCityName: "",
    };
  },
  methods: {
    // 左上箭头返回
    onClickLeft() {
      this.$router.push({
        path: "/home",
      });
    },
    // 获取城市列表数据
    async getCityList() {
      try {
        const res = await getCityApi(1);
        // console.log(res.data.body);
        this.cityList = res.data.body;
        return this.cityList;
      } catch (error) {
        console.log(error);
      }
    },
    // 处理城市列表数据
    async changeCityList() {
      let list = await this.getCityList();
      // console.log(list);
      let letterArr = [];
      let newList = [];
      // 获取首字母数组
      for (let i = 0; i <= list.length - 1; i++) {
        letterArr.push(list[i].short[0].toUpperCase());
      }
      // 首字母数组去重排序
      letterArr = [...new Set(letterArr)];
      letterArr.sort(function (a, b) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
      // 给目标数组添加空字母子对象
      letterArr.forEach((letter) => {
        let obj = {};
        obj.title = letter;
        obj.city = [];
        newList.push(obj);
      });
      this.letterList = letterArr;
      // console.log(newList);
      // console.log(letterArr);
      // 遍历原数组，将每个城市添加进新数组
      for (let i = 0; i <= list.length - 1; i++) {
        let firstLetter = list[i].short[0].toUpperCase();
        // console.log(firstLetter);
        let index = newList.findIndex((item) => item.title === firstLetter);
        newList[index].city.push(list[i]);
      }
      // console.log(newList);
      this.letterList.unshift("热");
      this.newList = newList;
      console.log(this.newList);
    },
    // 获取当前城市及热门城市
    async getHotCity() {
      const res = await getHotCityApi();
      // console.log(res);
      let hot = {
        title: "热",
        city: [],
      };
      res.data.body.forEach((item) => hot.city.push(item));
      this.newList.unshift(hot);
    },
    // 点击城市，获取城市名字
    clickCity(e) {
      this.clickCityName = e.target.innerText;
      // this.$route.meta.cityName = this.clickCityName;
      this.$store.commit("SET_CITYNAME", this.clickCityName);
      this.onClickLeft();
    },
  },
  created() {
    // 获取一级城市列表
    this.getCityList();
    this.changeCityList();
    this.getHotCity();
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

// 滑动样式
:deep(.van-index-bar__index) {
  margin: 5px 5px 10px 0;
  padding: 0;
  font-size: 14px;
  &.van-index-bar__index--active {
    color: #fff;
    background-color: #21b97a;
    border-radius: 100%;
    display: inline-block;
    font-size: 12px;
    width: 15px;
    height: 15px;
    line-height: 15px;
  }
}

:deep(.van-cell) {
  padding: 0px 16px;
  color: #333;
  font-size: 16px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
:deep(.van-index-anchor) {
  font-size: 14px;
  color: #999;
}
</style>
