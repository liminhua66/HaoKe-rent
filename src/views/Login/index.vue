<template>
  <div>
    <van-nav-bar
      class="title"
      title="账号登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="用户名" placeholder="请输入账号" />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登 录</van-button>
      </div>
    </van-form>
    <div class="register">
      <a @click="toRegister">还没有账号，去注册~</a>
    </div>
  </div>
</template>

<script>
import { Userlogin } from "@/api";
export default {
  /* eslint-disable */
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      const dataObj = { username: this.username, password: this.password };
      const res = await Userlogin(dataObj);
      const token = res.data.body.token;
      // console.log(res.data);
      if (res.data.status === 200) {
        this.$toast.success(res.data.description);
        this.$store.commit("SET_TOKEN", token);
        this.$router.push("/home/profile");
      } else {
        this.$toast.fail(res.data.description);
      }
    },
    toRegister() {
      this.$router.push("/register");
    },
    // 左上箭头返回
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="less">
.title {
  background-color: #21b97a;
}
:deep(.title) {
  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
}
.van-form {
  margin-top: 10px;
}
:deep(.van-field) {
  .van-cell__value {
    height: 60px;
    font-size: 17px;
    line-height: 47px;
    padding: 10px 0px;
    border-bottom: 1px solid #ccc !important;
  }
  .van-cell:last-child {
    padding-top: 0;
  }
}
.van-button {
  font-size: 18px;
  background-color: #21b97a;
  height: 50px;
}

.register {
  margin-top: 25px;
  font-size: 14px;
  color: #666;
  text-align: center;
}
</style>
