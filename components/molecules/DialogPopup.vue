<template>
  <div>
    <modal v-show="display" class="">
      <template v-slot:header v-if="title">
        {{ title }}
      </template>
      <template v-slot:body v-if="description">
        <div class="dialog-body">
          {{ description }}
        </div>
      </template>
      <template v-slot:footer>
        <div class="dialog-footer">
          <t1-button type="outline" @click.native="$emit('onLeftButtonClick')">
            {{leftButtonTitle}}
          </t1-button>
          <t1-button class="btn-edit" @click.native="$emit('onRightButtonClick')">
            {{rightButtonTitle}}
          </t1-button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import Modal from '~/components/atoms/Modal.vue'

@Component({
  components: {
    Modal,
    T1Button
  }
})
export default class DialogPopup extends Vue {
  @Prop({
    type: Boolean,
    required: true
  })
  readonly display!: boolean

  @Prop({
    type: String
  })
  readonly title!: string

  @Prop({
    type: String
  })
  readonly description!: string

  @Prop({
    type: String
  })
  readonly leftButtonTitle!: string

  @Prop({
    type: String
  })
  readonly rightButtonTitle!: string

  mounted(): void {}
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.dialog-body {
  margin-top: -20px;
  padding-top: 7px;
}
.dialog-footer {
  margin-top: 33px;
  display: flex;
  flex: 1;
  justify-content: space-between;
}
</style>
