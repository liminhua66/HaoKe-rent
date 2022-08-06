<template>
  <div>
    <van-cell :title="title" />
    <van-grid :gutter="18" :column-num="2">
      <van-grid-item
        v-for="(item, index) in list"
        :key="item.value"
        :text="item.label"
        @click="changeActive(item, index)"
        :class="{ active: activeTag[index] }"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "FilterItem",
  data() {
    return {
      activeTag: [],
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    title: String,
  },
  methods: {
    initTags() {
      for (let i = 0; i < this.list.length; i++) {
        this.activeTag.push(false);
      }
    },
    changeActive(item, index) {
      this.activeTag[index] = !this.activeTag[index];
      this.newActive = this.activeTag;
      // console.log(this.activeTag);
    },
  },
  mounted() {
    this.initTags();
    // console.log(this.activeTag);
  },
};
</script>

<style scoped lang="less">
:deep(.van-cell) {
  padding: 17px 16px;
  color: #333;
  font-size: 15px;
  &::after {
    border: 0;
  }
}
:deep(.van-grid) {
  margin: 0 14px 0 60px !important;
  padding: 0 52px 25px 0 !important;
  border-bottom: 1px solid #eee;
  .van-grid-item {
    width: 70px;
    height: 32px;
    .van-grid-item__content {
      padding: 0;
      border: 1px solid #ddd;
      border-radius: 3px;
      .van-grid-item__text {
        font-size: 12px;
        color: #888;
      }
    }
  }
}
.active {
  border: 1px solid #21b97a;
  color: #21b97a;
  background-color: #defaef;
}
</style>
