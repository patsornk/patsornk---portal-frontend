<template>
  <div class="pagination-container">
    <font-awesome-icon
      @click="prevPage()"
      class="pagination-icon"
      :icon="['fas', 'chevron-left']"
    />
    <template v-for="(page, index) in pages">
      <a
        :key="index"
        v-if="page.breakView"
        class="pagination-disabled"
        tabindex="0"
      >
        <slot name="breakViewContent">
          {{ breakViewText }}
        </slot>
      </a>
      <a
        :key="index"
        v-else
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
        class="pagination-page"
        :class="page.selected ? 'pagination-select' : ''"
        tabindex="0"
        >{{ page.content }}
      </a>
    </template>
    <font-awesome-icon
      @click="nextPage()"
      class="pagination-icon"
      :icon="['fas', 'chevron-right']"
    />
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch
} from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
  @Prop({
    type: Number,
    default: 0
  })
  readonly value!: number

  @Prop({
    type: Number,
    required: true
  })
  readonly pageCount!: number

  @Prop({
    type: Number
  })
  readonly forcePage!: number

  @Prop({
    type: Number,
    default: 1
  })
  readonly pageRange!: number

  @Prop({
    type: Number,
    default: 1
  })
  readonly marginPages!: number

  @Prop({
    type: String,
    default: 'Prev'
  })
  readonly prevText!: string

  @Prop({
    type: String,
    default: 'Next'
  })
  readonly nextText!: string

  @Prop({
    type: String,
    default: '...'
  })
  readonly breakViewText!: string

  @Prop({
    type: Function,
    default: () => {}
  })
  readonly clickHandler!: Function

  private innerValue: number = 1

  get selected(): number {
    return this.value || this.innerValue
  }

  set selected(val: number) {
    this.innerValue = val
  }

  get pages(): number {
    let items: any = {}
    if (this.pageCount <= this.pageRange) {
      for (let index = 0; index < this.pageCount; index++) {
        let page = {
          index: index,
          content: index + 1,
          selected: index === this.selected - 1
        }
        items[index] = page
      }
    } else {
      const halfPageRange = Math.floor(this.pageRange / 2)
      let setPageItem = (index: number) => {
        let page = {
          index: index,
          content: index + 1,
          selected: index === this.selected - 1
        }
        items[index] = page
      }
      let setBreakView = (index: number) => {
        let breakView = {
          disabled: true,
          breakView: true
        }
        items[index] = breakView
      }
      // 1st - loop thru low end of margin pages
      for (let i = 0; i < this.marginPages; i++) {
        setPageItem(i)
      }
      // 2nd - loop thru selected range
      let selectedRangeLow = 0
      if (this.selected - halfPageRange > 0) {
        selectedRangeLow = this.selected - 1 - halfPageRange
      }
      let selectedRangeHigh =
        selectedRangeLow + this.pageRange - 1
      if (selectedRangeHigh >= this.pageCount) {
        selectedRangeHigh = this.pageCount - 1
        selectedRangeLow =
          selectedRangeHigh - this.pageRange + 1
      }
      for (
        let i = selectedRangeLow;
        i <= selectedRangeHigh && i <= this.pageCount - 1;
        i++
      ) {
        setPageItem(i)
      }
      // Check if there is breakView in the left of selected range
      if (selectedRangeLow > this.marginPages) {
        setBreakView(selectedRangeLow - 1)
      }
      // Check if there is breakView in the right of selected range
      if (
        selectedRangeHigh + 1 <
        this.pageCount - this.marginPages
      ) {
        setBreakView(selectedRangeHigh + 1)
      }
      // 3rd - loop thru high end of margin pages
      for (
        let i = this.pageCount - 1;
        i >= this.pageCount - this.marginPages;
        i--
      ) {
        setPageItem(i)
      }
    }
    return items
  }

  private handlePageSelected(selected: number) {
    if (this.selected === selected) return
    this.innerValue = selected
    this.$emit('input', selected)
    this.clickHandler(selected)
  }
  private prevPage() {
    if (this.selected <= 1) return
    this.handlePageSelected(this.selected - 1)
  }
  private nextPage() {
    if (this.selected >= this.pageCount) return
    this.handlePageSelected(this.selected + 1)
  }
  private firstPageSelected() {
    return this.selected === 1
  }
  private lastPageSelected() {
    return (
      this.selected === this.pageCount ||
      this.pageCount === 0
    )
  }
  private selectFirstPage() {
    if (this.selected <= 1) return
    this.handlePageSelected(1)
  }
  private selectLastPage() {
    if (this.selected >= this.pageCount) return
    this.handlePageSelected(this.pageCount)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.pagination-container {
  display: flex;
  justify-content: space-between;
  font-size: 16px;

  a {
    cursor: pointer;
    height: 38px;
    width: 38px;

    &:focus {
      outline: none;
    }
  }

  .pagination-icon {
    cursor: pointer;
    height: 36px;
    margin: 0px 20px;
  }

  .pagination-page {
    text-align: center;
    padding-top: 4px;
  }

  .pagination-disabled {
    cursor: context-menu;
    height: 38px;
    width: 38px;
  }

  .pagination-select {
    cursor: pointer;
    height: 38px;
    width: 38px;
    border: 2px solid $primary;
    border-radius: 25px;
    background: $primary;
    color: $white;
  }
}
</style>