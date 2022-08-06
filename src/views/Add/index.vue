<template>
  <div class="add">
    <!-- 头部 -->
    <van-nav-bar
      class="title"
      title="发布房源"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <van-cell title="房源信息" class="house-header" />
    <!-- 小区名称 -->
    <van-field
      class="name"
      v-model="price"
      label="小区名称"
      placeholder="请输入小区名称"
      is-link
      disabled
      @click="$router.push('/rent/search')"
    >
    </van-field>
    <!-- 租金 -->
    <van-field v-model="price" placeholder="请输入租金/月">
      <template #label>租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</template>
      <template #extra>￥/月</template>
    </van-field>
    <!-- 建筑面积 -->
    <van-field v-model="area" label="建筑面积" placeholder="请输入建筑面积">
      <template #extra>㎡</template>
    </van-field>
    <!-- 户型 -->
    <PopupSelect :title="'户型'" :list="houseCondition.roomType"></PopupSelect>
    <!-- 所在楼层 -->
    <PopupSelect :title="'所在楼层'" :list="houseCondition.floor"></PopupSelect>
    <!-- 朝向 -->
    <PopupSelect :title="'朝向'" :list="houseCondition.oriented"></PopupSelect>
    <!-- 房屋标题 -->
    <div class="house-title">
      <van-cell title="房屋标题" />
      <van-field
        v-model="title"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
      />
    </div>
    <!-- 房屋图像 -->
    <div class="house-pic">
      <van-cell title="房屋图像" />
      <van-field name="uploader">
        <template #input>
          <van-uploader v-model="uploader" />
        </template>
      </van-field>
    </div>
    <!-- 房屋配置 -->
    <div class="house-config">
      <van-cell title="房屋配置" />
      <van-grid :column-num="5">
        <van-grid-item
          v-for="value in 10"
          :key="value"
          icon="photo-o"
          text="文字"
        />
      </van-grid>
    </div>
    <!-- 房屋描述 -->
    <div class="house-description">
      <van-cell title="房屋描述" />
      <van-field v-model="description" placeholder="请输入房屋描述信息" />
    </div>
  </div>
</template>

<script>
import PopupSelect from "./components/PopupSelect.vue";
import { getHouseCondition as getHouseConditionApi } from "@/api";
export default {
  components: { PopupSelect },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Add",
  data() {
    return {
      uploader: [{ url: "https://img01.yzcdn.cn/vant/leaf.jpg" }],
      houseCondition: {},
      price: "",
      area: "",
      title: "",
      description: "",
    };
  },
  created() {
    this.getHouseCondition();
  },
  methods: {
    // 获取房屋查询条件
    async getHouseCondition() {
      const cityId = this.$store.state.cityId;
      const { data } = await getHouseConditionApi(cityId);
      this.houseCondition = data.body;
      console.log(this.houseCondition);
      // this.columnsArea = [data.body.area, data.body.subway];
    },
  },
};
</script>

<style scoped lang="less">
.add {
  padding-top: 46px;
  font-size: 15px;
}
// 头部样式
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
// 主体部分样式
:deep(.van-field__label) {
  color: #666;
}
/* :deep(.van-field__control) {
  color: #888;
  margin-left: 120px;
} */
:deep(.van-field__body) {
  .van-field__control:disabled {
    -webkit-text-fill-color: #888;
  }
}
:deep(.name) {
  .van-field__control {
    margin-left: 120px;
  }
}
.van-cell.house-header {
  border-bottom: 1px solid #ddd;
  color: #21b97a;
  font-size: 15px;
  background-color: #fff;
  padding: 8px 16px;
}
.van-cell {
  border-bottom: 1px solid #ddd;
}
</style>
