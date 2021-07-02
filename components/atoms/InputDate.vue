<template>
  <div class="datepicker-container" :class="isDisabled">
    <div class="box">
      <section>
        <Datepicker
          v-model="dataValue"
          type="datetime"
          :format="dateFormat"
          :placeholder="placeholder"
          :show-time-panel="showTimePanel"
          :open="isOpen"
          :editable="false"
          :disabled-date="disabledRange"
          @close="handleOpenChange"
          @open="handleOpen"
          @click.native="isOpen = true"
          :popupStyle="{ left: 'auto',right: '60px'}"
        >
          <template v-slot:header>
            {{ titleDatePicker }}
          </template>
          <template v-slot:footer>
            <div class="footer-text"> {{ onlyDate }}
              <img
                class="image-calendar"
                :src="assets('icon/calendar.png')"
                alt="calendar"
              />
            </div>
            <div v-if="isDateTime" style="display: flex;margin-top: 23px">
              <dropdown
                v-model="hour"
                :lists="hourLists"
                :placeholder="'HH'"
                :error="isHaveError"
              ></dropdown>
              <div class="semi-colon">:</div>
              <dropdown
                v-model="minute"
                :lists="minuteLists"
                :placeholder="'MM'"
                :error="isHaveError"
              ></dropdown>
            </div>
            <div class="error-message" style="text-align: start" v-if="isHaveError"> {{ errorMessage }}</div>
            <div class="line-article"></div>
            <div class="footer-btn-container">
              <t1-button class="black" @click.native="cancel" style="margin-right: 17px">
                {{ $t('common.cancel').toString() }}
              </t1-button>
              <t1-button class="red" @click.native="apply">
                {{ $t('common.apply').toString() }}
              </t1-button>
            </div>
          </template>
        </Datepicker>
      </section>
    </div>
    <div class="modal-backdrop" v-if="isOpen"></div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import dropdown from '@/components/atoms/dropdown.vue'
import {hourLists, minuteLists} from '~/constants'
import 'vue2-datepicker/index.css'
import {getAssetsPath} from '~/helper/images'

@Component({
  components: {
    T1Button,
    dropdown,
  }
})
export default class InputTag extends Vue {
  @Prop({
    required: true,
    type: Date
  })
  private value!: Date

  @Prop({
    default: '',
    type: String
  })
  private errorMessage?: string

  @Prop({
    default: true,
    type: Boolean
  })
  private isDateTime?: boolean

  @Prop({
    default: 'disabled',
    type: String
  })
  private isDisabled?: string

  @Prop({
    default: 'Select datetime',
    type: String
  })
  private placeholder?: string

  @Prop({
    default: '',
    type: String
  })
  private titleDatePicker!: string

  @Prop({
    required: true,
    type: Date
  })
  private startDate!: Date

  @Prop({
    type: Date
  })
  private endDate?: Date

  private hour = this.value.getHours().toString().padStart(2, '0')
  private hourLists = hourLists
  private minute = this.value.getMinutes().toString().padStart(2, '0')
  private minuteLists = minuteLists
  private isOpen = false
  private showTimePanel = false
  private isHaveError = false
  private dateWhenCancel = new Date

  get dataValue() {
    return this.value
  }

  set dataValue(value) {
    this.$emit('input', value)
  }

  get dateFormat() {
    return this.isDateTime ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'
  }

  get onlyDate() {
    return this.dataValue.getDate() + '/' + this.dataValue.getMonth() + '/' + this.dataValue.getFullYear()
  }

  @Watch('value')
  changePublishDate(): void {
    this.hour = this.value.getHours().toString().padStart(2, '0')
    this.minute = this.value.getMinutes().toString().padStart(2, '0')
  }

  @Watch('errorMessage')
  changeErrorMessage(): void {
    if (this.errorMessage) {
      this.isHaveError = true
    } else {
      this.isOpen = false
      this.isHaveError = false
    }
  }

  assets(name: string) {
    return getAssetsPath(name)
  }

  cancel() {
    let temp = JSON.parse(JSON.stringify(this.dateWhenCancel))
    let temp2 = new Date(temp)
    this.$emit('date-change', temp2, this.placeholder)
    this.isOpen = false
  }

  apply() {
    this.dataValue.setHours(Number(this.hour))
    this.dataValue.setMinutes(Number(this.minute))
    this.$emit('date-change', this.dataValue, this.placeholder, true)
    this.changeErrorMessage()
  }

  mounted() {

  }

  toggleTimePanel() {
    this.showTimePanel = !this.showTimePanel
  }

  handleOpenChange() {
    this.isOpen = false
  }

  handleOpen() {
    let temp = JSON.parse(JSON.stringify(this.dataValue))
    this.dateWhenCancel = new Date(temp)
  }

  disabledRange(date: Date) {
    let temp = JSON.parse(JSON.stringify(this.startDate))
    let minimumDate = new Date(temp)
    minimumDate.setDate(minimumDate.getDate() - 1)
    return date < minimumDate

  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.footer-text {
  height: 42px;
  border: 1px solid #B2B2B2;
  box-sizing: border-box;
  border-radius: 4px;
  margin-top: 23px;
  padding: 9px 16px;
  display: flex;
  color: $mid-black;
  position: relative;

  .image-calendar {
    position: absolute;
    right: 11px;
    bottom: 11px;
    width: 20px;
    height: 20px;
  }
}

.semi-colon {
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 24px;
  padding: 0 6px;
  color: $mid-black;
}

.error-message {
  display: flex;
  color: $primary;
  align-items: flex-start;
  margin-top: 3px;
}

.line-article {
  margin-top: 16px;
  width: 100%;
  border-bottom: 1px solid $grey-hover;
}

.disabled {
  pointer-events: none;
}

.enabled {
  pointer-events: auto;
}

::v-deep .mx-datepicker {
  width: 100%;
}

::v-deep .mx-icon-calendar svg {
  display: none;
}

.footer-btn-container {
  display: flex;
  margin-top: 19px;
}
</style>
