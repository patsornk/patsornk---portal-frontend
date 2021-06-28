<template>
  <div class="datepicker-container">
    <div class="box">
      <section>
        <Datepicker
          v-model="dataValue"
          type="datetime"
          format="DD/MM/YYYY"
          placeholder="Select datetime"
          :show-time-panel="showTimePanel"
          @close="handleOpenChange"
        >
          <template v-slot:header>
            {{ $t('article.datepicker.title') }}
          </template>
          <template v-slot:footer>
            <div class="footer-text">{{ dataValue }}</div>
            <div class="footer-btn-container">
              <t1-button class="black" @click.native="search">
                {{ $t('common.search').toString() }}
              </t1-button>
              <t1-button class="black" @click.native="search">
                {{ $t('common.search').toString() }}
              </t1-button>
            </div>
          </template>
        </Datepicker>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import 'vue2-datepicker/index.css'

@Component({
  components: {
    T1Button
  }
})
export default class InputTag extends Vue {
  @Prop({
    required: true,
    type: String
  })
  private value!: string

  @Prop({
    default: '',
    type: String
  })
  private errorMessage?: string

  get dataValue() {
    return this.value
  }

  set dataValue(value) {
    this.$emit('input', value)
  }

  mounted() {}
  valueDate = null
  showTimePanel = false

  toggleTimePanel() {
    this.showTimePanel = !this.showTimePanel
  }

  handleOpenChange() {}

  selectDate() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.datepicker-container {
  .footer-text {
    height: 42px;
  }
}

::v-deep .mx-datepicker {
  width: 100%;
}
</style>