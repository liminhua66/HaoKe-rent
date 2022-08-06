<template>
  <div class="detail" style="background: #eee">
    <!-- 头部 -->
    <van-nav-bar
      class="title"
      :title="item.community"
      left-arrow
      @click-left="onClickLeft"
      fixed
    />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item v-for="(i, index) in item.houseImg" :key="index">
        <van-image
          width="100%"
          height="100%"
          :src="`http://liufusong.top:8080${i}`"
        />
      </van-swipe-item>
    </van-swipe>
    <!-- 房屋详细信息 -->
    <div class="house-detail">
      <van-cell :title="item.title" />
      <div class="tags">
        <span v-for="(t, index) in item.tags" :key="index">{{ t }}</span>
      </div>
      <van-row class="price-type-size">
        <van-col span="8">
          <div>{{ item.price }}<span class="month">/月</span></div>
          <div>租金</div>
        </van-col>
        <van-col span="8">
          <div>{{ item.roomType }}</div>
          <div>房型</div>
        </van-col>
        <van-col span="8">
          <div>{{ item.size }}平米</div>
          <div>面积</div>
        </van-col>
      </van-row>
      <van-row class="more">
        <van-col span="12">
          <p><span>装修：</span>精装</p>
          <p><span>楼层：</span>{{ item.floor }}</p>
        </van-col>
        <van-col span="12">
          <p><span>朝向：</span>{{ item.oriented?.[0] }}</p>
          <p><span>类型：</span>普通住宅</p>
        </van-col>
      </van-row>
    </div>
    <!-- 地图 -->
    <div class="map"></div>
    <!-- 房屋配套样式 -->
    <div class="about">
      <van-cell title="房屋配套" />
      <van-grid :column-num="5" :border="false">
        <van-grid-item
          icon="service-o"
          :text="p"
          v-for="(p, index) in item.supporting"
          :key="index"
        />
      </van-grid>
    </div>
    <!-- 房源概况 -->
    <div class="set">
      <van-cell title="房源概况" />
      <van-row>
        <van-col span="10">
          <van-image
            width="52px"
            height="52px"
            src="http://liufusong.top:8080/img/avatar.png"
          />
          <div class="gires">
            <p>王女士</p>
            <i class="iconfont icon-auth"></i>
            已认证房主
          </div>
        </van-col>
        <van-col span="14">
          <van-button>发消息</van-button>
        </van-col>
      </van-row>
      <div class="name">
        <p>
          1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
          2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
          3.人车分流，环境优美。
          4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
        </p>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="favorite">
      <van-cell title="猜你喜欢" />
      <ul>
        <li class="list-item">
          <div class="left">
            <img src="http://liufusong.top:8080/img/message/1.png" alt="" />
          </div>
          <div class="right">
            <h3 class="house-title">安贞西里 3室1厅</h3>
            <div class="house-info">72.32㎡/南 北/低楼层</div>
            <div class="house-transport">
              <span>随时看房</span>
            </div>
            <div class="house-price"><span>4500</span> 元/月</div>
          </div>
        </li>
        <li class="list-item">
          <div class="left">
            <img src="http://liufusong.top:8080/img/message/2.png" alt="" />
          </div>
          <div class="right">
            <h3 class="house-title">天居园 2室1厅</h3>
            <div class="house-info">83㎡/南/高楼层</div>
            <div class="house-transport">
              <span>近地铁</span>
            </div>
            <div class="house-price"><span>7200</span> 元/月</div>
          </div>
        </li>
        <li class="list-item">
          <div class="left">
            <img src="http://liufusong.top:8080/img/message/3.png" alt="" />
          </div>
          <div class="right">
            <h3 class="house-title">角门甲4号院 1室1厅</h3>
            <div class="house-info">52㎡/西南/低楼层</div>
            <div class="house-transport">
              <span>集中供暖</span>
            </div>
            <div class="house-price"><span>4300</span> 元/月</div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 底部栏 -->
    <div class="footer">
      <van-row>
        <van-col span="8">
          <button @click="changeFavorite">
            <img
              :src="
                isFavoriteHouse
                  ? `http://liufusong.top:8080/img/star.png`
                  : `http://liufusong.top:8080/img/unstar.png`
              "
              alt=""
              style="width: 16px; height: 16px"
            />
            收藏
          </button>
        </van-col>
        <van-col span="8"><button>在线咨询</button></van-col>
        <van-col span="8"><button class="last">电话预约</button></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getHouseById, isFavorite, addFavorite, delFavorite } from "@/api";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Detail",
  data() {
    return {
      item: {},
      isShow: false,
      isFavoriteHouse: "",
    };
  },
  created() {
    this.getHouseById();
  },
  methods: {
    // 左上箭头返回
    onClickLeft() {
      this.$router.go(-1);
    },
    // 根据Id发送请求获取数据
    async getHouseById() {
      const id = this.$store.state.houseCode;
      // console.log(id);
      const { data } = await getHouseById(id);
      // console.log(data);
      this.item = data.body;
    },
    // 判断是否收藏
    async isFavorite() {
      const id = this.$store.state.houseCode;
      const { data } = await isFavorite(id);
      this.isFavoriteHouse = data.body.isFavorite;
    },
    // 添加取消收藏
    async changeFavorite() {
      // 判断是否登录，未登录时弹窗
      if (!this.isLogin) {
        this.$dialog
          .confirm({
            title: "好客租房",
            message: "您还未登录，是否跳转至登录页面",
            confirmButtonText: "跳转",
            confirmButtonColor: "#108EE9",
          })
          .then(() => {
            // on confirm
            this.$router.push({
              path: "/login",
            });
          })
          .catch(() => {
            // on cancel
          });
      }
      // 已登录时
      const id = this.$store.state.houseCode;
      if (this.isFavoriteHouse) {
        await delFavorite(id);
      } else {
        await addFavorite(id);
      }
      this.isFavorite();
    },
  },
  mounted() {
    this.isFavorite();
  },
  computed: {
    isLogin() {
      return !!this.$store.state.token;
    },
    /* isFavoriteHouse() {
      return this.isFavorite();
    }, */
  },
};
</script>

<style scoped lang="less">
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
// 轮播图样式
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
:deep(.my-swipe) {
  padding-top: 46px;
  .van-swipe-item {
    background-color: #fff;
    height: 252px;
  }
  .van-swipe__indicators {
    bottom: 6px;
    .van-swipe__indicator {
      width: 8px;
      height: 8px;
      background-color: #ccc;
      border-radius: 100%;
    }
    .van-swipe__indicator--active {
      background-color: #888 !important;
    }
  }
}
// 房屋详细信息样式
:deep(.house-detail) {
  padding: 15px;
  background: #fff;
  .van-cell {
    &::after {
      border: none;
    }
    padding: 0;
    margin: 14px 0;
    .van-cell__title {
      font-size: 16px;
      color: #333;
    }
  }
  .tags {
    span {
      color: #39becd;
      background: #e1f5f8;
      display: inline-block;
      font-size: 12px;
      border-radius: 3px;
      padding: 4px 5px;
      margin-right: 5px;
      line-height: 12px;
    }
  }
  .van-row.price-type-size {
    align-items: center;
    margin: 15px 0;
    padding: 15px 0;
    border-top: 1px solid #cecece;
    border-bottom: 1px solid #cecece;
    .van-col {
      // height: 26px;
      min-width: 10px;
      text-align: center;
      color: #999;
      & div:first-child {
        color: #fa5741;
        font-size: 18px;
        font-weight: bolder;
        .month {
          font-size: 12px;
          font-weight: 400;
        }
      }
      & div:last-child {
        font-size: 14px;
        margin-top: 6px;
      }
    }
  }
  .van-row.more {
    font-size: 13px;
    .van-col {
      span {
        display: inline-block;
        color: #999;
        padding-right: 5px;
        line-height: 26px;
      }
    }
  }
}
// 地图样式
.map {
  margin-top: 10px;
  background-color: pink;
  height: 189px;
}
// 房屋配套样式
:deep(.about) {
  margin-bottom: 10px;
  padding: 0 10px;
  background: #fff;
  .van-cell {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 20px;
    padding: 13px 0;
    border-bottom: 1px solid #cecece;
  }
}
// 房源概况样式
:deep(.set) {
  position: relative;
  margin: 10px 0;
  padding: 0 10px;
  line-height: 150%;
  background: #fff;
  .van-cell {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 10px;
    padding: 13px 0;
    border-bottom: 1px solid #cecece;
  }
  .van-col--10 {
    position: relative;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    .gires {
      line-height: 0.3867rem;
      color: #fa5741;
      padding-top: 0.2133rem;
      p {
        margin: 10px 0 14px 0;
        color: #333;
      }
      .icon-auth {
        font-size: 12px;
      }
    }
  }
  .van-button--normal {
    position: relative;
    left: 120px;
    top: 0;
    width: 75px;
    height: 30px;
    font-size: 14px;
    padding: 0;
    color: #33be85;
    border: 1px solid #33be85;
  }
  .name {
    p {
      padding-bottom: 10px;
      margin-top: 20px;
      font-size: 14px;
      color: #333;
    }
  }
}
// 猜你喜欢样式
:deep(.favorite) {
  position: relative;
  margin: 10px 0;
  padding: 0 10px;
  line-height: 150%;
  background: #fff;
  .van-cell {
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 20px;
    padding: 13px 0;
    border-bottom: 1px solid #cecece;
  }
}
.list-item {
  height: 120px;
  width: 100%;
  padding: 18x 0 0;
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
// 底部样式
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  button {
    width: 100%;
    height: 50px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #999;
  }
  .last {
    background-color: #21b97a;
    color: #fff;
  }
}
</style>
