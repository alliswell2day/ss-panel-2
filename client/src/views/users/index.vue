<template>
  <div>
    <div class="weui-loadmore" v-if="isLoading">
      <i class="weui-loading"></i>
      <span class="weui-loadmore__tips">加载中...</span>
    </div>
    <div class="weui-loadmore weui-loadmore_line" v-else-if="!items || !items.length">
      <span class="weui-loadmore__tips">暂无数据</span>
    </div>
    <div class="weui-panel weui-panel_access" v-else>
      <div class="weui-panel__bd">
        <router-link :to="{name: 'user-detail', params: {userId: item.userId}}"
          class="weui-media-box weui-media-box_appmsg" v-for="item in items" :key="item.userId">
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">
              <span>{{item.name}}</span>
              <span class="value">{{item.transferUsedV}}</span>
            </h4>
            <ul class="weui-media-box__info">
              <li class="weui-media-box__info__meta">
                {{'活跃于 '+ item.activeAt}}
              </li>
              <li class="weui-media-box__info__meta">
                {{'已用，共 ' + item.transferEnableV}}
              </li>
            </ul>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../../api'
import {getTransferPercent} from '../../libs/utils'

export default {
  data () {
    return {
      isLoading: false,
      items: []
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    fetch () {
      this.isLoading = true
      Api('/api/users').then((res) => {
        this.isLoading = false
        for (let item of res.data) {
          let transferPercent = getTransferPercent(item.transferEnable, item.transferUsed) * 100
          item.transferPercent = transferPercent.toFixed(2)
        }
        this.items = res.data
      }).catch(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>

.weui-media-box__title {
  font-size: 1.1em;
}
.weui-media-box__title .value {
  float: right;
  color: #FB7886;
}
.weui-media-box__title .value span:last-child {
  font-size: 0.6em;
}
.weui-media-box__info {
  margin-top: 10px;
}
.weui-media-box__info .weui-media-box__info__meta:last-child {
  float: right;
  padding-right: 0;
}
</style>
