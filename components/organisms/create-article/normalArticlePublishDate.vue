<template>
  <div class="normal-article-publish-container">
    <div class="publish-article-area">
      <div class="normal-article-publish-title">
        {{ $t('contentManagement.articlePublishDate') }}
      </div>
      <div class="normal-article-publish-content now">
        <div class="radio-btn-area" @click="articlePublishDate = 'publish-now'" :class="activePublishBtn">
          <div class="radio-btn" v-if="articlePublishDate === 'publish-now'"></div>
        </div>
        <span style="padding-left: 11px"> {{ $t('contentManagement.publishNow') }} </span>
      </div>
      <div class="normal-article-publish-content schedule">
        <div class="radio-btn-area" @click="articlePublishDate = 'publish-schedule'" :class="activePublishBtn">
          <div class="radio-btn" v-if="articlePublishDate === 'publish-schedule'"></div>
        </div>
        <span style="padding-left: 11px"> {{ $t('contentManagement.publishSchedule') }} </span>
      </div>
      <div class="input-article-date" :class="isPublishError" v-if="isPublishSchedule === 'enabled'">
        <input-date
          v-model="publishDate"
          :isDisabled="isPublishSchedule"
          :is-date-time="true"
          :startDate="startPublishDate"
          :endDate="endPublishDate"
          :errorMessage="error.publish"
          :placeholder="$t('contentManagement.articlePublishDatePlaceholder')"
          :title-date-picker="$t('contentManagement.articlePublishDate')"
          @date-change="setDateChange"
        ></input-date>
      </div>
      <div v-else class="calendar-container" :class="isPublishSchedule">
        {{ $t('contentManagement.articlePublishDatePlaceholder') }}
      </div>
      <img
        class="image-calendar"
        :src="assets('icon/calendar.png')"
        alt="calendar"
      />
    </div>
    <div class="error-space"> {{ error.publish }}</div>
    <div class="line-article"></div>
    <div class="expire-article-area">
      <div class="normal-article-expire-title">
        {{ $t('contentManagement.articleExpireDate') }}
      </div>
      <div class="normal-article-expire-content now">
        <div class="radio-btn-area" @click="articleExpireDate = 'no-expire'" :class="activeExpireBtn">
          <div class="radio-btn" v-if="articleExpireDate === 'no-expire'"></div>
        </div>
        <span style="padding-left: 11px"> {{ $t('contentManagement.noExpireDate') }} </span>
      </div>
      <div class="normal-article-expire-content schedule">
        <div class="radio-btn-area" @click="articleExpireDate = 'expire-schedule'" :class="activeExpireBtn">
          <div class="radio-btn" v-if="articleExpireDate === 'expire-schedule'"></div>
        </div>
        <span style="padding-left: 11px"> {{ $t('contentManagement.publishSchedule') }} </span>
      </div>
      <div class="input-article-date" :class="isExpireError" v-if="isExpireSchedule === 'enabled'">
        <input-date
          v-model="expireDate"
          :isDisabled="articleExpireDate"
          :is-date-time="true"
          :startDate="startExpireDate"
          :errorMessage="error.expire"
          :placeholder="$t('contentManagement.articleExpireDatePlaceholder')"
          :title-date-picker="$t('contentManagement.articleExpireDate')"
          @date-change="setDateChange"
        ></input-date>
      </div>
      <div v-else class="calendar-container" :class="isExpireSchedule">
        {{ $t('contentManagement.articleExpireDatePlaceholder') }}
      </div>
      <img
        class="image-calendar"
        :src="assets('icon/calendar.png')"
        alt="calendar"
      />
    </div>
    <div class="error-space"> {{ error.expire }}</div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {getAssetsPath} from '~/helper/images'
import InputDate from '@/components/atoms/InputDate.vue'
import {ErrorNormalArticlePublish} from '~/constants'

@Component({
  components: {
    InputDate
  }
})

export default class NormalArticleTag extends Vue {
  private articlePublishDate = 'publish-now'
  private articleExpireDate = 'no-expire'
  private today = new Date()
  private todayPlusOne = new Date(+this.today.getFullYear(), +this.today.getMonth(), +this.today.getDate(), +this.today.getHours(), +this.today.getMinutes() + 1, 0, 0,)
  private publishDate = this.today
  private expireDate = new Date(3000, 12, 31) //default expire date to year 3000
  private saveSchedulePublish = new Date()
  private saveScheduleExpire = new Date()
  private applyPublishClick = 0
  private applyExpireClick = 0
  private error: ErrorNormalArticlePublish = {
    publish: '',
    expire: ''
  }

  get activePublishBtn() {
    return this.articlePublishDate
  }

  get isPublishSchedule() {
    if (this.articlePublishDate === 'publish-schedule') {
      return 'enabled'
    } else {
      return 'disabled'
    }
  }

  get activeExpireBtn() {
    return this.articleExpireDate
  }

  get isExpireSchedule() {
    if (this.articleExpireDate === 'expire-schedule') {
      return 'enabled'
    } else {
      return 'disabled'
    }
  }

  get startPublishDate() {
    return this.today
  }

  get endPublishDate() {
    if (this.expireDate && !(this.expireDate.getTime() === this.today.getTime())) {
      return this.expireDate
    } else {
      return undefined
    }
  }

  get startExpireDate() {
    if (this.publishDate) {
      return this.publishDate
    } else
      return new Date
  }

  get isPublishError() {
    if (this.error.publish) {
      return 'error'
    } else {
      return ''
    }
  }

  get isExpireError() {
    if (this.error.expire) {
      return 'error'
    } else {
      return ''
    }
  }

  get isSubmit(): string {
    return this.$store.getters['article/isSubmit']
  }

  @Watch('publishDate')
  changePublishDate(): void {
    this.setNowDate()
    if (!this.publishDate) { //if user delete all date
      this.publishDate = this.today
    } else {
      if (this.articleExpireDate === 'expire-schedule') {
        if (this.expireDate.getTime() > this.today.getTime()) {
          if (this.expireDate.getTime() > this.publishDate.getTime()) {
            this.error.expire = ''
          } else {
            this.error.expire = this.$t('contentManagement.error.expireDate').toString()
          }
        }
      }
    }
  }

  @Watch('articlePublishDate')
  changePublishType(): void {
    this.setNowDate()
    if (this.articlePublishDate === 'publish-now') {
      let temp = JSON.parse(JSON.stringify(this.publishDate)) //hard copy
      this.saveSchedulePublish = new Date(temp) //save to temp date
      this.publishDate = new Date()
      this.error.publish = ''
    } else {
      let temp = JSON.parse(JSON.stringify(this.saveSchedulePublish)) //hard copy
      this.publishDate = new Date(temp) //restore from temp date
      this.setDateChange(this.publishDate, this.$t('contentManagement.articlePublishDatePlaceholder').toString(), false)
    }
  }

  @Watch('expireDate')
  changeExpireDate(): void {
    this.setNowDate()
    if (!this.expireDate) { //if user deleted all date
      this.expireDate = this.todayPlusOne
    } else {
      if (this.articlePublishDate === 'publish-schedule') {
        if (this.publishDate.getTime() > this.today.getTime()) {
          if (this.publishDate.getTime() < this.expireDate.getTime()) {
            this.error.publish = ''
          }
        }
      }
    }
  }

  @Watch('articleExpireDate')
  changeExpireType(): void {
    this.setNowDate()
    if (this.articleExpireDate === 'no-expire') {
      let temp = JSON.parse(JSON.stringify(this.expireDate)) //hard copy
      this.saveScheduleExpire = new Date(temp) //save to temp date
      this.expireDate = new Date(3000, 12, 31) //set expire date to year 3000
      this.error.expire = ''
    } else {
      let temp = JSON.parse(JSON.stringify(this.saveScheduleExpire)) //hard copy
      this.expireDate = new Date(temp) //restore from temp date
      this.setDateChange(this.expireDate, this.$t('contentManagement.articleExpireDatePlaceholder').toString(), false)
    }
  }

  @Watch('isPublishError')
  updatePublishErrorToStore(): void {
    if (!this.error.publish) {
      this.$store.dispatch('article/setIsHavePublish', true)
    } else {
      this.$store.dispatch('article/setIsHavePublish', false)
    }
  }

  @Watch('isExpireError')
  updateExpireErrorToStore(): void {
    if (!this.error.expire) {
      this.$store.dispatch('article/setIsHaveExpire', true)
    } else {
      this.$store.dispatch('article/setIsHaveExpire', false)
    }
  }

  @Watch('isSubmit')
  onChangedSubmit(): void {
    this.setDateChange(this.publishDate, this.$t('contentManagement.articlePublishDatePlaceholder').toString(), true)
    this.setDateChange(this.expireDate, this.$t('contentManagement.articleExpireDatePlaceholder').toString(), true)
    if (this.error.expire || this.error.publish) {
      this.$store.dispatch('article/setIsHavePublish', false)
    }
  }

  mounted() {
    this.$store.dispatch('article/setIsHavePublish', true)
    this.$store.dispatch('article/setIsHaveExpire', true)
  }

  beforeDestroy() {
    this.$store.dispatch('article/setIsHavePublish', false)
    this.$store.dispatch('article/setIsHaveExpire', false)
  }

  setNowDate() {
    this.today = new Date
    this.todayPlusOne = new Date(+this.today.getFullYear(), +this.today.getMonth(), +this.today.getDate(), +this.today.getHours(), +this.today.getMinutes() + 1, 0, 0,)
  }

  setDateChange(date: Date, placeholder: string, applyClick: boolean) {
    this.setNowDate()
    if (placeholder === this.$t('contentManagement.articlePublishDatePlaceholder')) { //publish date
      if (applyClick) {
        this.applyPublishClick += 1
      }
      if (date.getTime() > this.today.getTime() || this.applyPublishClick === 0 || this.articlePublishDate === 'publish-now') {
        this.error.publish = ''
      } else {
        console.log('test')
        this.error.publish = this.$t('contentManagement.error.publishDate').toString()
      }
      this.publishDate = new Date(+date.getFullYear(), +date.getMonth(), +date.getDate(), +date.getHours(), +date.getMinutes(), +date.getSeconds())
    } else if (placeholder === this.$t('contentManagement.articleExpireDatePlaceholder')) { //expire date
      if (applyClick) {
        this.applyExpireClick += 1
      }
      if ((date.getTime() >= this.publishDate.getTime() && date.getTime() > this.today.getTime()) || this.applyExpireClick === 0) {
        this.error.expire = ''
      } else {
        this.error.expire = this.$t('contentManagement.error.expireDate').toString()
      }
      this.expireDate = new Date(+date.getFullYear(), +date.getMonth(), +date.getDate(), +date.getHours(), +date.getMinutes(), +date.getSeconds())
    }
  }

  assets(name: string) {
    return getAssetsPath(name)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.normal-article-publish-container {
  background: $white;
  padding: 28px 37px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;

  .publish-article-area {
    width: 100%;
    flex-direction: column;
    position: relative;

    .normal-article-publish-title {
      color: $mid-black;
      font-weight: 700;
      font-size: 18px;
      line-height: 20px;
    }

    .normal-article-publish-content {
      display: flex;
      margin-top: 7px;
      align-items: center;

      .radio-btn-area {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #5C5C5C;
        position: relative;
        cursor: pointer;

        .radio-btn {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $primary;
          position: absolute;
          top: 2px;
          left: 2px;
        }
      }
    }

    .input-article-date {
      border-radius: 5px;
      margin-top: 15px;
      cursor: pointer;
    }

    .input-article-date.error {
      border: 1px solid $primary;
    }

    .now {
      .publish-now {
        cursor: default !important;
      }
    }

    .schedule {
      .publish-schedule {
        cursor: default !important;
      }
    }

    .calendar-container {
      border: 1px solid #B2B2B2;
      border-radius: 4px;
      height: 42px;
      margin-top: 15px;
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: 17px;
      color: $gray-disable;
    }

    .disabled {
      background: $disabled-for-textbox;
      pointer-events: none;
      height: 44px;
      border: none;
    }

    .calendar-container.enabled {
      display: none;
    }
  }

  .error-space {
    height: 30px;
    margin-top: 2px;
    font-size: 12px;
    line-height: 18px;
    color: $primary;
  }

  .line-article {
    margin-top: 9px;
    width: 100%;
    border-bottom: 1px solid $grey-hover;
  }

  .expire-article-area {
    width: 100%;
    flex-direction: column;
    padding-top: 31px;
    position: relative;

    .normal-article-expire-title {
      color: $mid-black;
      font-weight: 700;
      font-size: 18px;
      line-height: 20px;
    }

    .normal-article-expire-content {
      display: flex;
      margin-top: 7px;
      align-items: center;

      .radio-btn-area {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid #5C5C5C;
        position: relative;
        cursor: pointer;

        .radio-btn {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $primary;
          position: absolute;
          top: 2px;
          left: 2px;
        }
      }
    }

    .input-article-date {
      border-radius: 5px;
      margin-top: 15px;
      cursor: pointer;
    }

    .input-article-date.error {
      border: 1px solid $primary;
    }

    .now {
      .no-expire {
        cursor: default !important;
      }
    }

    .schedule {
      .expire-schedule {
        cursor: default !important;
      }
    }

    .calendar-container {
      border: 1px solid #B2B2B2;
      border-radius: 4px;
      height: 42px;
      margin-top: 15px;
      display: flex;
      align-items: center;
      padding-left: 17px;
      color: $gray-disable;
    }

    .disabled {
      background: $disabled-for-textbox;
      pointer-events: none;
      border: none;
      height: 44px;
      width: 100%;
    }

    .calendar-container.enabled {
      display: none;
    }
  }

  .image-calendar {
    position: absolute;
    right: 11px;
    bottom: 12px;
    width: 20px;
    height: 20px;
  }
}

</style>
