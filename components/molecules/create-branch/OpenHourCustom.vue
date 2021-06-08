<template>
  <div>
    <div
      class="open-custom-container"
      v-for="(item, index) in dataList"
      :key="index"
    >
      <div class="day-box">
        <div>{{ item.day }}</div>
        <div class="day-off">
          <input-field
            type="checkbox"
            :title="$t('Mark as day off')"
            v-model="item.isDayOff"
            @onChange="$emit('changeCusTomList', { index, time: '' })"
            :shouldBeError=false 
          />
        </div>
      </div>
      <div class="open-daily-box">
        <input-field
          class="open-time"
          v-model="item.openTime"
          :disable="item.isDayOff"
          required
          type="select"
          :options="timeList"
          :optionsReduce="(item) => item.label"
          optionsLabel="label"
          :placeholder="$t('createBranch.openingHour')"
          :errorMessage="item.openError"
          @onChange="$emit('changeCusTomList', { index, time: 'open' })"
          searchable
        />
        <input-field
          class="open-meridiem"
          v-model="item.openMeridiem"
          :disable="item.isDayOff"
          required
          type="select"
          :options="meridiemList"
          :optionsReduce="(item) => item.label"
          optionsLabel="label"
          :errorMessage="item.openMeridiemError"
        />
        <span class="to">to</span>
        <input-field
          class="open-time"
          v-model="item.closeTime"
          :disable="item.isDayOff"
          required
          type="select"
          :options="timeList"
          :optionsReduce="(item) => item.label"
          optionsLabel="label"
          :placeholder="$t('createBranch.closingHour')"
          :errorMessage="item.closeError"
          @onChange="$emit('changeCusTomList', { index, time: 'close' })"
          searchable
        />
        <input-field
          class="open-meridiem"
          v-model="item.closeMeridiem"
          :disable="item.isDayOff"
          required
          type="select"
          :options="meridiemList"
          :optionsReduce="(item) => item.label"
          optionsLabel="label"
          :errorMessage="item.closeMeridiemError"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import InputField from '~/components/atoms/InputField.vue'

@Component({
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

  get dataList() {
    return this.value
  }

  set dataList(value) {
    this.dataList = value
  }

  timeList = [
    {
      label: '12 : 00'
    },
    {
      label: '12 : 30'
    },
    {
      label: '01 : 00'
    },
    {
      label: '01 : 30'
    },
    {
      label: '02 : 00'
    },
    {
      label: '02 : 30'
    },
    {
      label: '03 : 00'
    },
    {
      label: '03 : 30'
    },
    {
      label: '04 : 00'
    },
    {
      label: '04 : 30'
    },
    {
      label: '05 : 00'
    },
    {
      label: '05 : 30'
    },
    {
      label: '06 : 00'
    },
    {
      label: '06 : 30'
    },
    {
      label: '07 : 00'
    },
    {
      label: '07 : 30'
    },
    {
      label: '08 : 00'
    },
    {
      label: '08 : 30'
    },
    {
      label: '09 : 00'
    },
    {
      label: '09 : 30'
    },
    {
      label: '10 : 00'
    },
    {
      label: '10 : 30'
    },
    {
      label: '11 : 00'
    },
    {
      label: '11 : 30'
    }
  ]

  meridiemList = [
    {
      label: 'AM'
    },
    {
      label: 'PM'
    }
  ]
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.open-custom-container {
  display: flex;
  margin: 0px 20px;
  padding: 16px 0px 24px 0px;
  border-bottom: 1px solid $grey3;

  .day-box {
    margin-top: 14px;
    margin-right: 52px;
  }

  .open-daily-box {
    display: flex;
    margin-top: 10px;

    .open-time {
      width: 175px;
    }

    .open-meridiem {
      width: 86px;
      margin-left: 13px;
    }

    .to {
      margin: 17px 28px;
    }
  }
}
</style>
