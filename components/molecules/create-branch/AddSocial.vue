<template>
  <div class="website-container">
    <div class="input-box" v-for="(item, index) in dataList" :key="index">
      <input-field
        class="input-type"
        v-model="dataList[index].type"
        required
        type="select"
        :options="socialList"
        :optionsReduce="(item) => item.label"
        optionsLabel="label"
        :placeholder="$t('createBranch.selectSocialMedia')"
        :errorMessage="
          dataList[index].errorType ? dataList[index].errorType : ''
        "
      />
      <input-field
        class="input-website"
        v-model="dataList[index].link"
        :placeholder="$t('createBranch.socialLink')"
        :maxlength="255"
        :errorMessage="
          dataList[index].errorLink ? dataList[index].errorLink : ''
        "
      />
      <img
        class="icon-close"
        :src="assets('icon/close.png')"
        @click="removeInput(index)"
      />
    </div>
    <div class="btn-add" @click="addInput">
      <span class="material-icons icon"> add </span>
      <span>{{ $t('createBranch.mallInfo.addSocialLink') }} </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
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

  socialList = [
    {
      id: 1,
      label: `${this.$t('createBranch.facebook')}`
    },
    {
      id: 2,
      label: `${this.$t('createBranch.instagram')}`
    },
    {
      id: 3,
      label: `${this.$t('createBranch.line')}`
    },
    {
      id: 4,
      label: `${this.$t('createBranch.twitter')}`
    }
  ]

  get dataList() {
    return this.value
  }

  set dataList(value) {
    this.dataList = value
  }

  mounted() {
    if (this.dataList?.length === 0) {
      this.$emit('input', [{ type: '', link: '' }])
    }
  }

  addInput() {
    this.dataList?.push({ type: 0, link: '' })
  }

  removeInput(index: number) {
    this.dataList?.splice(index, 1)
    if (this.dataList?.length === 0) {
      this.$emit('closeAddSocialButton', true)
    }
  }

  assets(name: string) {
    return getAssetsPath(name)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.website-container {
  margin-top: 20px;

  .input-box {
    display: flex;

    .input-type {
      width: 260px;
      margin: 0px 10px 0px 30px;
    }

    .input-website {
      width: 605px;
      margin-right: 30px;

      &.input-field-input {
        font-size: 16px;
        padding: 9px;
        border: 1px solid $gray-disable;
        border-radius: 4px;
        width: 100%;
      }

      &.input-field-input:focus {
        outline: none !important;
      }

      &.input-field-input-error {
        border: 1px solid $primary !important;
        border-radius: 4px;
      }

      &.input-field-input-error .vs__dropdown-toggle {
        border: 1px solid $primary;
      }
    }

    .icon-close {
      cursor: pointer;
      width: 16px;
      height: 16px;
      margin-top: 22px;
    }
  }

  .btn-add {
    cursor: pointer;
    height: 36px;
    width: 137px;
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
    color: $primary;
    background: $tritery-red;
    border-radius: 6px;
    padding: 6px;
    margin: 19px 0px 0px 30px;

    .icon {
      font-size: 14px;
      font-weight: 700;
      padding-top: 2px;
    }
  }
}
</style>
