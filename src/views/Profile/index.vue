<template>
  <div>
    <div class="my-title">
      <img
        v-if="!isLogin"
        class="my-bg"
        src="http://liufusong.top:8080/img/profile/bg.png"
        alt=""
      />
      <img
        v-else
        class="my-bg"
        :src="`http://liufusong.top:8080${message.avatar}`"
        alt=""
      />
      <!-- 去登录 -->
      <div class="my-info">
        <div class="my-icon">
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
        </div>
        <div class="my-user" v-if="!isLogin">
          <div class="my-name">游客</div>
          <div class="my-edit" @click="toLogin">去登录</div>
        </div>
        <div class="my-user-login" v-else>
          <div class="my-name-login">{{ message.nickname }}</div>
          <div class="my-edit-logout" @click="logout">退出</div>
          <div class="my-edit-message">
            <span>编辑个人资料</span>
            <span class="iconfont icon-arrow"></span>
          </div>
        </div>
      </div>
    </div>
    <!-- 我的收藏6个部分 -->
    <van-row justify="center">
      <van-col span="8">
        <div class="nav-item">
          <a @click="toFavorate">
            <div class="item">
              <i class="iconfont icon-coll"></i>
              <span>我的收藏</span>
            </div>
          </a>
        </div>
      </van-col>
      <van-col span="8">
        <div class="nav-item">
          <a @click="toRent">
            <div class="item">
              <i class="iconfont icon-ind"></i>
              <span>我的出租</span>
            </div>
          </a>
        </div>
      </van-col>
      <van-col span="8">
        <div class="nav-item">
          <a>
            <div class="item">
              <i class="iconfont icon-record"></i>
              <span>看房记录</span>
            </div>
          </a>
        </div>
      </van-col>
      <van-col span="8">
        <div class="nav-item">
          <a>
            <div class="item">
              <i class="iconfont icon-identity"></i>
              <span>成为房主</span>
            </div>
          </a>
        </div>
      </van-col>
      <van-col span="8">
        <div class="nav-item">
          <a>
            <div class="item">
              <i class="iconfont icon-myinfo"></i>
              <span>个人资料</span>
            </div>
          </a>
        </div>
      </van-col>
      <van-col span="8">
        <div class="nav-item">
          <a>
            <div class="item">
              <i class="iconfont icon-cust"></i>
              <span>联系我们</span>
            </div>
          </a>
        </div>
      </van-col>
    </van-row>
    <div class="my-ad">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { getUserApi } from "@/api";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Profile",
  data() {
    return {
      message: {},
    };
  },
  methods: {
    // 路由跳转登录页面
    toLogin() {
      this.$router.push("/login");
    },
    // 路由跳转我的收藏页面
    toFavorate() {
      if (this.$store.state.token) {
        this.$router.push("/favorate");
      } else {
        this.toLogin();
      }
    },
    // 路由跳转我的出租页面
    toRent() {
      if (this.$store.state.token) {
        this.$router.push("/rent");
      } else {
        this.toLogin();
      }
    },
    // 发送请求获取数据
    async getUserMessage() {
      const res = await getUserApi();
      this.message = res.data.body;
    },
    // 退出登录
    logout() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否确定退出",
        })
        .then(() => {
          // on confirm
          this.$store.commit("SET_TOKEN", "");
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  mounted() {
    this.getUserMessage();
  },
  computed: {
    isLogin() {
      return !!this.$store.state.token;
    },
  },
};
</script>

<style scoped lang="less">
.my-title {
  min-height: 300px;
  position: relative;
  margin-bottom: 10px;
  .my-bg {
    width: 100%;
  }
  .my-info {
    position: absolute;
    background: #fff;
    width: 85%;
    height: 55%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px 3px #ddd;
    margin: 50px auto 0;
    padding: 0 20px;
    text-align: center;
    font-size: 13px;
    .my-icon {
      position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 70px;
      height: 70px;
      border: 5px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 2px 2px #bdbdbd;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .my-user {
      padding-top: 10px;
      .my-name {
        margin-top: -30px;
        margin-bottom: 10px;
      }
      .my-edit {
        width: 70px;
        height: 30px;
        background-color: #21b97a;
        color: #fff;
        font-size: 13px;
        margin: 20px auto 0;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
      }
    }
    .my-user-login {
      margin-top: -17px;
      .my-edit-logout {
        width: 54px;
        height: 20px;
        background-color: #21b97a;
        color: #fff;
        font-size: 11px;
        margin: 7px auto 0;
        text-align: center;
        line-height: 20px;
        border-radius: 10px;
      }
      .my-edit-message {
        margin-top: 25px;
        span {
          font-size: 12px;
          color: #999;
          // line-height: 12px;
        }
        .iconfont {
          margin: 3px 0 0 3px;
          display: inline-block;
          transform: rotate(-90deg);
        }
      }
    }
  }
}
// 导航区域样式
.nav-item {
  height: 95px;
  padding: 15px 0;
  text-align: center;
  color: #333;
  a {
    color: #333;
    text-decoration: none;
    .item {
      display: flex;
      flex-direction: column;
      i {
        font-size: 20px;
        margin-bottom: 10px;
      }
      span {
        font-size: 13px;
      }
    }
  }
}
// 广告
.my-ad {
  text-align: center;
  margin-top: 10px px;
  img {
    width: 92%;
  }
}
</style>
