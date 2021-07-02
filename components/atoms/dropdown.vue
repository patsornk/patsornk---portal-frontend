<template>
  <div class="dropdown" :class="isError" style="float: left">
    <button class="dropbtn">
      <span>{{ value ? value : placeholder }}</span>
      <span class="material-icons"> expand_more </span>
    </button>
    <div id="dropdown-content" class="dropdown-content" style="left: 0">
      <a
        v-for="item in lists"
        :key="item.value"
        @click="selectDropdownItem(item.value)"
      >
        {{ item.value }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Prop, Component, Emit} from 'vue-property-decorator'

@Component({})
export default class T1Dropdown extends Vue {
  @Prop({
    type: String,
    required: true
  })
  value!: string

  @Prop({
    type: Array,
    required: true,
    default: []
  })
  readonly lists!: Array<object>

  @Prop({
    type: String,
    default: 'Please select...'
  })
  readonly placeholder!: string

  @Prop({
    type: Boolean
  })
  readonly disabled!: boolean

  @Prop({
    type: Boolean
  })
  readonly error!: boolean

  @Emit('input')
  emitOnSelect(value: string): string {
    return value
  }

  get isError() {
    if (this.error) {
      return 'error'
    } else return ''
  }

  selectDropdownItem(item: string): void {
    this.emitOnSelect(item)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.dropdown {
  position: relative;
  padding: 9px 16px;
  border: 1px solid $gray-disable;
  border-radius: 6px;
  width: 100%;

  .dropbtn {
    width: 100%;
    font-size: 16px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: space-between;

    &:focus {
      outline: none;
    }

    .dropdown-icon {
      margin-top: 4px;
    }
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: #f9f9f9;
    min-width: 110px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    text-align: left;
    overflow: auto;
    height: 180px;
  }
}

.error {
  border: 1px solid $primary;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover {
  .dropdown-content {
    display: block;
  }
}

</style>
