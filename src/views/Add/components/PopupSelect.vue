<template>
  <div>
    <van-field
      v-model="value"
      :label="title"
      placeholder="请选择"
      is-link
      disabled
      @click="isShow = true"
    >
    </van-field>
    <!-- 弹出层 -->
    <van-popup v-model="isShow" position="bottom" :style="{ height: '42%' }">
      <van-picker
        show-toolbar
        :columns="list"
        value-key="label"
        confirm-button-text="确定"
        @confirm="onConfirm"
        @cancel="isShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "PopupSelect",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      isShow: false,
      value: "",
    };
  },
  methods: {
    onConfirm(value, index) {
      console.log(value);
      this.$toast(`当前值：${value.label}, 当前索引：${index}`);
      this.value = value.label;
      if (this.title === "户型") {
        this.$store.commit("SET_ROOMTYPE", this.value);
      } else if (this.title === "所在楼层") {
        this.$store.commit("SET_FLOOR", this.value);
      } else {
        this.$store.commit("SET_ORIENTED", this.value);
      }
      // this.$store.state.houseArr.push(value.label);
      this.isShow = false;
    },
  },
};
</script>

<style scoped lang="less">
:deep(.van-field__control) {
  margin-left: 180px;
}
</style>
