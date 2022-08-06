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
        <div @click="toCity" class="icon-arrowdown">
          {{ $store.state.cityName || "北京" }}
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
      <van-dropdown-menu>
        <van-dropdown-item title="区域" ref="item1">
          <!-- 区域 -->
          <van-picker
            value-key="label"
            :columns="columnsArea"
            show-toolbar
            toolbar-position="bottom"
            @cancel="$refs.item1.toggle()"
            @confirm="onConfirmAreaSubway"
          >
          </van-picker>
        </van-dropdown-item>
        <van-dropdown-item title="方式" ref="item2">
          <!-- 方式 -->
          <van-picker
            value-key="label"
            :columns="columnsRentType"
            show-toolbar
            toolbar-position="bottom"
            @cancel="$refs.item2.toggle()"
            @confirm="onConfirmRentType"
          >
          </van-picker>
        </van-dropdown-item>
        <van-dropdown-item title="租金" ref="item3">
          <!-- 租金 -->
          <van-picker
            value-key="label"
            :columns="columnsPrice"
            show-toolbar
            toolbar-position="bottom"
            @cancel="$refs.item3.toggle()"
            @confirm="onConfirmPrice"
          >
          </van-picker>
        </van-dropdown-item>
        <!-- 筛选区域 -->
        <van-dropdown-item disabled>
          <template #title>
            <van-cell @click="showPopup" title="筛选"></van-cell>
          </template>
        </van-dropdown-item>
        <van-popup
          show-toolbar
          v-model="show"
          position="right"
          :style="{ height: '100%', width: '79%' }"
        >
          <filter-item
            :list="houseCondition.roomType"
            :title="'户型'"
          ></filter-item>
          <filter-item
            :list="houseCondition.oriented"
            :title="'朝向'"
          ></filter-item>
          <filter-item
            :list="houseCondition.floor"
            :title="'楼层'"
          ></filter-item>
          <filter-item
            :list="houseCondition.characteristic"
            :title="'房屋亮点'"
          ></filter-item>
          <div class="clickButton">
            <van-button class="cancel">清除</van-button>
            <van-button class="confirm">确认</van-button>
          </div>
        </van-popup>
      </van-dropdown-menu>
    </div>
    <!-- 选择区域 -->
    <ul>
      <li
        class="list-item"
        v-for="item in houseList"
        :key="item.houseCode"
        @click="toDetail(item.houseCode)"
      >
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
import FilterItem from "./components/FilterItem.vue";
import { getHouseApi, getHouseCondition as getHouseConditionApi } from "@/api";
const deep = function (arr) {
  if (!arr[0]) return [];
  arr[0].children[0].children = [{ label: "" }];
  arr[1].children[0].children = [{ label: "" }];
  return arr;
};
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "List",
  components: { FilterItem },
  data() {
    return {
      show: false,
      value: "",
      houseList: [],
      params: {},
      houseCondition: {},
      cityId: this.$store.state.cityId,
    };
  },
  created() {
    this.getHouseCondition();
  },
  methods: {
    // 搜索功能，待定义
    onSearch() {},
    // 左上箭头返回
    onClickLeft() {
      this.$router.go(-1);
    },
    showPopup() {
      this.show = true;
    },
    // 路由跳转城市列表
    toCity() {
      this.$router.push("/city");
    },
    // 路由跳转详情页
    toDetail(id) {
      this.$router.push({
        path: "/detail",
      });
      this.$store.commit("SET_HOUSECODE", id);
    },
    getContainer() {
      return document.querySelector(".filterxxxx");
    },
    // 获取所有的列表数据
    async getList() {
      const res = await getHouseApi(this.params);
      // console.log(res);
      this.houseList = res.data.body.list;
    },
    // 获取房屋查询条件
    async getHouseCondition() {
      const cityId = this.$store.state.cityId;
      const { data } = await getHouseConditionApi(cityId);
      this.houseCondition = data.body;
      // console.log(this.houseCondition);
      // this.columnsArea = [data.body.area, data.body.subway];
    },
    // 发送请求获取区域筛选后的列表
    onConfirmAreaSubway(picker, values) {
      // 判断第一级选择是地铁还是区域，来确定params里的值应该设置哪个
      if (values[0] === 0) {
        if (this.params.subway) {
          this.params.subway = "";
        }
        // 当三级选择中最后选择项为不限时，取前一项的value，直到取到value不为null的
        if (values[1] === 0) {
          this.params.area = this.houseCondition.area.value;
        } else if (values[2] === 0) {
          this.params.area = this.houseCondition.area.children[values[1]].value;
        } else {
          this.params.area =
            this.houseCondition.area.children[values[1]].children[
              values[2]
            ].value;
        }
      } else {
        if (this.params.area) {
          this.params.area = "";
        }
        // 当三级选择中最后选择项为不限时，取前一项的value，直到取到value不为null的
        if (values[1] === 0) {
          this.params.subway = this.houseCondition.subway.value;
        } else if (values[2] === 0) {
          this.params.subway =
            this.houseCondition.subway.children[values[1]].value;
        } else {
          this.params.subway =
            this.houseCondition.subway.children[values[1]].children[
              values[2]
            ].value;
        }
      }
      console.log(this.params);
      this.$refs.item1.toggle();
      this.getList();
    },
    // 发送请求获取方式筛选后的列表
    onConfirmRentType(picker, values) {
      this.params.rentType = this.houseCondition.rentType[values].value;
      this.$refs.item2.toggle();
      this.getList();
    },
    // 发送请求获取价格筛选后的列表
    onConfirmPrice(picker, values) {
      // console.log(values);
      this.params.price = this.houseCondition.price[values].value;
      // console.log(this.params);
      this.$refs.item3.toggle();
      this.getList();
    },
    rentTypeChange() {},
    PriceChange() {},
  },
  mounted() {
    const cityId = this.$store.state.cityId;
    const params = { cityId };
    this.params = params;
    this.getList();
  },
  computed: {
    // 区域地铁
    columnsArea() {
      return deep([this.houseCondition.area, this.houseCondition.subway]);
    },
    // 整租合租
    columnsRentType() {
      return this.houseCondition.rentType;
    },
    // 租金
    columnsPrice() {
      return this.houseCondition.price;
    },
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
:deep(.van-dropdown-menu__bar) {
  height: 40px;
  box-shadow: none;
  border-bottom: 1px solid #eee;
  .van-dropdown-menu__title::after {
    border-color: transparent transparent #bbb #bbb;
  }
  .van-ellipsis {
    font-size: 17px;
    color: #333;
  }
}

//弹出层样式
:deep(.van-picker__toolbar) {
  height: 50px;
  border-top: 1px solid #e9e9e9;
  box-sizing: border-box;
  .van-picker__cancel {
    flex: 1;
    color: #21b97a;
    font-size: 18px;
    padding: 0;
  }
  .van-picker__confirm {
    flex: 2;
    color: #fff;
    background-color: #21b97a;
    font-size: 18px;
    padding: 0;
  }
}
:deep(.van-dropdown-menu__bar) {
  .van-dropdown-menu__item:last-child {
    .van-cell {
      padding: 7px 16px;
    }
    .van-cell__title {
      color: #333;
      font-size: 17px;
    }
    .van-dropdown-menu__title::after {
      right: 10px;
    }
  }
}
:deep(.van-popup--right) {
  .clickButton {
    position: sticky;
    bottom: 0;
    right: 0;
    display: flex;
    height: 50px;
    z-index: 3;
    .cancel {
      flex: 1;
      height: 50px;
      color: #21b97a;
      font-size: 18px;
    }
    .confirm {
      flex: 2;
      height: 50px;
      color: #fff;
      background-color: #21b97a;
      font-size: 18px;
    }
  }
}
/* :deep(.van-picker-column__item) {
  height: 34px !important;
}
:deep(.van-picker__frame) {
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  top: 48%;
} */

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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
