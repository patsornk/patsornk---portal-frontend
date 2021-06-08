<template>
  <div>
    <div class="table-header">
      <div>
        <span v-if="headerTitle != ''">
          {{ headerTitle }}
        </span>
        <span v-if="currentSelectedRows" class="icon-list">
          <div v-if="isShowActive" class="icon-container">
            <img
              class="icon"
              :src="assets('table/active.png')"
              @click="clickAction('clickActive')"
            />
            <span class="tooltiptext">{{ $t('common.active') }}</span>
          </div>
          <div v-if="isShowIconHold" class="icon-container">
            <img
              class="icon"
              :src="assets('table/hold.png')"
              @click="clickAction('clickHold')"
            />
            <span class="tooltiptext">On hold</span>
          </div>
          <div v-if="isShowInactive" class="icon-container">
            <img
              class="icon"
              :src="assets('table/inactive.png')"
              @click="clickAction('clickInActive')"
            />
            <span class="tooltiptext">Inactive</span>
          </div>
          <div v-if="isShowDelete" class="icon-container">
            <img
              class="icon"
              :src="assets('table/delete.png')"
              @click="clickAction('clickDelete')"
            />
            <span class="tooltiptext">Delete</span>
          </div>
        </span>
        <span v-else class="icon-list">
          <img
            v-if="isShowActive"
            class="icon-container icon"
            :src="assets('table/active-disable.png')"
          />
          <img
            v-if="isShowIconHold"
            class="icon-container icon"
            :src="assets('table/hold-disable.png')"
          />
          <img
            v-if="isShowInactive"
            class="icon-container icon"
            :src="assets('table/inactive-disable.png')"
          />
          <img
            v-if="isShowDelete"
            class="icon-container icon"
            :src="assets('table/delete-disable.png')"
          />
        </span>
      </div>
      <div v-if="isCreateNew">
        <button class="add-new-btn" @click="$emit('clickNew')">
          <span v-if="isShowAddIcon" class="material-icons icon"> add </span>
          <span class="text">{{ createNewTitle }}</span>
        </button>
      </div>
      <div v-if="isCreateNoIcon">
        <button class="add-new-btn" @click="$emit('clickNew')">
          <span class="text">{{ createNewTitle }}</span>
        </button>
      </div>
      <div v-if="isTwoBtn" class="btn-container">
        <button class="add-new-btn" @click="$emit('clickBtnLeft')">
          <span class="text">{{ titleLeft }}</span>
        </button>
        <button class="add-new-btn" @click="$emit('clickBtnRight')">
          <span class="text">{{ titleRight }}</span>
        </button>
      </div>
    </div>
    <ag-grid-vue
      ref="agGridTable"
      class="ag-theme-material w-100 ag-grid-table"
      col-resize-default="shift"
      row-selection="multiple"
      :class="`num-${rawData.length}`"
      :row-data="rawData"
      :animate-rows="true"
      :column-defs="columnDefsData"
      :default-col-def="defaultColDef"
      :floating-filter="false"
      :grid-options="gridOptions"
      :pagination="true"
      :pagination-page-size="paginationPageSize"
      :suppress-pagination-panel="true"
      :suppress-row-click-selection="isShowCheckBox"
      :framework-components="frameworkComponents"
      @selection-changed="onSelectionChanged"
      @row-selected="onRowSelected"
    >
    </ag-grid-vue>
    <div
      v-if="!isLoading && !rawData.length"
      class="data-not-found-container"
      :class="{
        'icon-margin': isShowDataNotFoundIcon,
        'text-margin': isShowDataNotFoundText
      }"
    >
      <img
        v-if="!rawData.length && isShowDataNotFoundIcon"
        class="data-not-found-icon"
        :src="assets('table/data-not-found.png')"
      />
      <div
        v-if="!rawData.length && isShowDataNotFoundText"
        class="data-not-found-text"
      >
        {{ dataNotFoundText }}
      </div>
    </div>
    <div v-if="isShowPaginate" class="footer-container">
      <div>
        <span class="sum-select">{{ currentSelectedRows }}</span>
        <span> / {{ totalItem }} {{ $t('common.itemSelected') }}</span>
      </div>
      <t1-pagination
        v-model="currentPage"
        class="pagination-container"
        :page-count="totalPage"
        :margin-pages="2"
        :page-range="5"
        @input="onChenagePage"
      />
      <div class="footer-container">
        <div>{{ $t('common.show') }}:</div>
        <v-select
          v-model="pagination"
          class="dropdown"
          :options="lists"
          :label="'value'"
          :reduce="(item) => item.value"
          :clearable="false"
          :searchable="false"
          :map-keydown="deleteHandler"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { AgGridVue } from 'ag-grid-vue'
import T1Pagination from '@/components/atoms/pagination.vue'
import { DataPrePageList } from '~/constants'
import { getAssetsPath } from '~/helper/images'

import '@/assets/scss/agGridStyleOverride.scss'

@Component({
  components: {
    AgGridVue,
    T1Pagination
  }
})
export default class TableComponent extends Vue {
  $i18n: any
  get language(): any {
    return this.$i18n.locale
  }

  private name = 'table-component'

  @Prop({
    type: Number,
    default: 0
  })
  readonly selectedItem?: string

  @Prop({
    type: Number,
    default: 0
  })
  readonly totalItem?: number

  @Prop({
    type: Number,
    default: 1
  })
  readonly totalPage?: string

  @Prop({
    type: Number,
    default: 10,
    required: false
  })
  readonly currentPageSize?: number

  @Prop({
    type: String,
    default: ''
  })
  readonly headerTitle!: string

  @Prop({
    type: Array,
    required: true
  })
  readonly columnDefs!: Array<any>

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isShowPaginate!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  readonly isShowSearch!: boolean

  @Prop({
    type: Array,
    required: true
  })
  readonly rawData!: Array<any>

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isShowCheckBox!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isShowHeaderTable!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  readonly isShowActive!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  readonly isShowIconHold!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  readonly isShowInactive!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  readonly isShowDelete!: boolean

  @Prop({
    type: Array,
    default: []
  })
  value!: Array<any>

  @Prop({
    type: Function
  })
  readonly onRowClicked!: () => void

  @Prop({
    type: Function
  })
  readonly onCellClicked!: () => void

  @Prop({
    type: Object,
    default: null
  })
  readonly frameworkComponents!: any

  @Prop({
    type: Number,
    default: 40
  })
  readonly rowHeight!: number

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isCreateNew!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isCreateNoIcon!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isTwoBtn!: boolean

  @Prop({
    type: Boolean,
    default: true
  })
  readonly isShowAddIcon!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isShowDataNotFoundIcon?: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isShowDataNotFoundText?: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isLoading?: boolean

  @Prop({
    type: String,
    default: ''
  })
  readonly dataNotFoundText?: string

  @Prop({
    type: String,
    default: ''
  })
  readonly createNewTitle!: string

  @Prop({
    type: String,
    default: ''
  })
  readonly titleLeft!: string

  @Prop({
    type: String,
    default: ''
  })
  readonly titleRight!: string

  @Prop({
    type: Number,
    default: 1,
    required: false
  })
  currentPage?: number

  @Prop({
    type: String,
    default: 'id'
  })
  readonly itemKey!: string

  assets(name: string) {
    return getAssetsPath(name)
  }

  private selectData: any = {}
  private selectedIds = []
  private lists = DataPrePageList
  private selectedRows = 0
  private pagination = 10
  private searchQuery = ''
  private gridOptions: any = {
    onRowClicked: this.onRowClicked,
    rowHeight: this.rowHeight,
    headerHeight: this.isShowHeaderTable ? 52 : 0
  }
  private gridApi: any = null
  private defaultColDef = {
    resizable: true
  }
  private isCheckboxSelection = false

  private updateSearchQuery(val: any) {
    this.searchQuery = val
    this.gridApi.setQuickFilter(val)
  }

  private onSelectionChanged() {
    this.isCheckboxSelection = true
    this.$nextTick(() => {
      this.isCheckboxSelection = false
    })
  }

  get currentSelectedRows(): number {
    return this.value.length
  }

  onRowSelected(event: any): void {
    const isSelected = event.node.isSelected()
    const index = this.value.findIndex(
      (data: any) => event.node.data[this.itemKey] === data[this.itemKey]
    )
    if (index > -1 && !isSelected) {
      this.value.splice(index, 1)
    } else if (index < 0 && isSelected) {
      this.value.push(event.node.data)
    }
  }

  private onInnerWidthChanged() {
    this.gridApi.sizeColumnsToFit()
  }

  onChenagePage(currentPage: number): void {
    this.$emit('onChenagePage', currentPage)
  }

  private setSelectedEachNode() {
    this.gridApi.forEachNode((node: any) => {
      const index = this.value.findIndex(
        (data: any) => node.data[this.itemKey] === data[this.itemKey]
      )
      node.setSelected(index > -1)
    })
  }

  get paginationPageSize(): number {
    if (this.gridApi) return this.gridApi.paginationGetPageSize()
    else return 50
  }

  get totalPages(): number {
    if (this.gridApi) return this.gridApi.paginationGetTotalPages()
    else return 0
  }

  get columnDefsData(): Array<object> {
    return this.isShowCheckBox
      ? [
          {
            headerName: ' ',
            maxWidth: 50,
            checkboxSelection: true,
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            suppressSizeToFit: false
          },
          ...this.columnDefs
        ]
      : this.columnDefs
  }

  deleteHandler(map: any, vm: any): any {
    return {
      ...map,
      8: (e: any) => {
        e.preventDefault()
      }
    }
  }

  clickAction(action: string): void {
    this.$emit(action, action)
  }

  @Watch('value')
  chengeValue(): void {
    if (!this.isCheckboxSelection) {
      this.setSelectedEachNode()
    }
  }

  @Watch('pagination')
  chengePagination(): void {
    this.$emit('pagination', this.pagination)
    this.gridApi.paginationSetPageSize(this.pagination)
  }

  @Watch('language')
  refreshHeader(): void {
    this.gridApi.redrawRows()
  }

  mounted(): void {
    this.gridApi = this.gridOptions.api

    window.onresize = this.onInnerWidthChanged
    this.gridApi.sizeColumnsToFit()
    this.gridApi.paginationSetPageSize(this.currentPageSize)
  }

  updated(): void {
    this.setSelectedEachNode()
  }
}
</script>

<style lang="scss">
@import './TableComponent.scss';
</style>
