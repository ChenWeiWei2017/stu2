<template>
  <div>
    <h3>首页</h3>
    <van-row gutter="20">
      <van-col span="12"><van-button type="primary" :to="{ name: 'login' }" block>登陆</van-button></van-col>
      <van-col span="12"><van-button type="primary" :to="{ name: 'register' }" block>注册</van-button></van-col>
    </van-row>
  </div>
</template>

<script>
import { Button } from 'vant'
import { Col, Row } from 'vant'

export default {
  name: 'Layout',
  components: {
    [Button.name]: Button,
    [Col.name]: Col,
    [Row.name]: Row
  }
}
</script>

<style lang="sass" scoped>

</style>
