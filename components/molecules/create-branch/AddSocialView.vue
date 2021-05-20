<template>
  <div class="social-container">
    <div class="list-box" v-for="(item, index) in dataList" :key="index">
      <div class="icon-social">
        <img
          v-if="item.type === type.FACEBOOK"
          :src="assets('icon/facebook.png')"
        />
        <img
          v-if="item.type === type.INSTARGRAM"
          :src="assets('icon/instagram.png')"
        />
        <img 
          v-if="item.type === type.LINE" 
          :src="assets('icon/line.png')" />
        <img
          v-if="item.type === type.TWITTER"
          :src="assets('icon/twitter.png')"
        />
      </div>
      <div class="link-box">
        <div class="link">{{ item.link }}</div>
        <div class="type">{{ item.type }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateBranch } from '~/constants'
import InputField from '~/components/atoms/InputField.vue'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { getAssetsPath } from '~/helper/images'

const validations = {
  dataList: { $each: { type: { required }, link: { required } } }
}

@Component({
  mixins: [validationMixin],
  validations: validations,
  components: {
    InputField
  }
})
export default class AddSocial extends Vue {
  @Prop({
    required: true,
    type: Array
  })
  private value?: object[]
  
  private type = CreateBranch

  get dataList() {
    return this.value
  }

  set dataList(value) {
    this.dataList = value
  }

  assets(name: string) {
    return getAssetsPath(name)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.social-container {
  margin: 24px 0px 0px 30px;

  .list-box {
    display: flex;
    margin-bottom: 17px;

    .icon-social {
      width: 24px;
      height: 24px;
      margin-top: 4px;
    }

    .link-box {
      margin-left: 19px;
      font-size: 16px;
      line-height: 24px;

      .link {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 600px;
      }

      .type {
        font-size: 14px;
        color: $gray-disable;
      }
    }
  }
}
</style>
