<template>
  <div>
    <div class="table-header">
      <div>
        <span v-if="headerTitle != ''">
          {{ headerTitle }}
        </span>
        <span class="icon-list" v-if="selectedRows">
          <div class="icon-container" v-if="isShowActive">
            <img
              class="icon"
              :src="assets('table/active.png')"
              @click="$emit('clickActive', gridApi.getSelectedRows())"
            />
            <span class="tooltiptext">Inactive</span>
          </div>
          <div class="icon-container" v-if="isShowIconHold">
            <img
              class="icon"
              :src="assets('table/hold.png')"
              @click="$emit('clickHold', gridApi.getSelectedRows())"
            />
            <span class="tooltiptext">On hold</span>
          </div>
          <div class="icon-container" v-if="isShowInactive">
            <img
              class="icon"
              :src="assets('table/inactive.png')"
              @click="$emit('clickInactive', gridApi.getSelectedRows())"
            />
            <span class="tooltiptext">Inactive</span>
          </div>
          <div class="icon-container" v-if="isShowDelete">
            <img
              class="icon"
              :src="assets('table/delete.png')"
              @click="$emit('clickDelete', gridApi.getSelectedRows())"
            />
            <span class="tooltiptext">Delete</span>
          </div>
        </span>
        <span class="icon-list" v-else>
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
          <span class="material-icons icon" v-if="isShowAddIcon"> add </span>
          <span class="text">{{ createNewTitle }}</span>
        </button>
      </div>
    </div>
    <ag-grid-vue
      ref="agGridTable"
      :class="`num-${rawData.length}`"
      :animateRows="true"
      :columnDefs="columnDefsData"
      :defaultColDef="defaultColDef"
      :floatingFilter="false"
      :gridOptions="gridOptions"
      :pagination="true"
      :paginationPageSize="paginationPageSize"
      :rowData="rawData"
      :suppressPaginationPanel="true"
      :suppressRowClickSelection="isShowCheckBox"
      class="ag-theme-material w-100 ag-grid-table"
      colResizeDefault="shift"
      rowSelection="multiple"
      @selection-changed="onSelectionChanged"
      :frameworkComponents="frameworkComponents"
    >
    </ag-grid-vue>
    <div class="footer-container" v-if="isShowPaginate">
      <span>{{ selectedRows }} / {{ totalItem }}</span>
      <t1-pagination
        class="pagination-container"
        v-model="currentPage"
        @input="onChenagePage"
        :pageCount="totalPage"
        :marginPages="2"
        :pageRange="5"
      />
      <div class="footer-container">
        <div>Show:</div>
        <v-select
          class="dropdown"
          v-model="pagination"
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
  readonly totalItem?: string

  @Prop({
    type: Number,
    default: 1
  })
  readonly totalPage?: string

  @Prop({
    type: String,
    default: ''
  })
  readonly headerTitle!: string

  @Prop({
    type: Array,
    required: true
  })
  readonly columnDefs!: Array<object>

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
  readonly rawData!: Array<object>

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
  value!: Array<object>

  @Prop({
    type: Function,
    default: () => {}
  })
  readonly onRowClicked!: Function

  @Prop({
    type: Function,
    default: () => {}
  })
  readonly onCellClicked!: Function

  @Prop({
    type: Object,
    default: null
  })
  readonly frameworkComponents!: Object

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
    default: true
  })
  readonly isShowAddIcon!: boolean

  @Prop({
    type: String,
    default: ''
  })
  readonly createNewTitle!: string
  
  @Prop({
    type: Number,
    default: 1,
    required: false
  })
  currentPage?: Number

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
  private maxPageNumbers = 7
  private gridApi: any = null
  private defaultColDef = {
    resizable: true
  }
  private isCheckboxSelection = false

  private updateSearchQuery(val: any) {
    this.searchQuery = val
    this.gridApi.setQuickFilter(val)
  }

  private onSelectionChanged(value: any) {
    this.isCheckboxSelection = true
    const selectedRows = this.gridApi.getSelectedRows()
    const currentSelectedIds = selectedRows.map((row: any) => row.companyId)
    this.rawData.forEach((data: any) => {
      this.selectData[data.companyId] = currentSelectedIds.includes(data[this.itemKey])
    })

    this.selectedRows = this.selectedItemNumber()

    this.$emit('input', selectedRows)
    this.$nextTick(() => {
      this.isCheckboxSelection = false
    })
  }

  @Watch('pagination')
  private onChangePagination() {
    this.$emit('pagination', this.pagination)
  }

  private onInnerWidthChanged() {
    this.gridApi.sizeColumnsToFit()
  }

  onChenagePage(currentPage: number) {
    this.$emit('onChenagePage', currentPage)
  }

  private setSelectedEachNode() {
    this.gridApi.forEachNode((node: any) => {
      node.setSelected(
        this.value.findIndex((data: any) => node.data.id === data.id) !== -1
      )
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

  selectedItemNumber(): number {
    let count = 0;
    for(var key in this.selectData) {
      count += this.selectData[key] ? 1 : 0
    }
    return count
  }

  @Watch('value')
  async chengeValue(): Promise<void> {
    if (!this.isCheckboxSelection) {
      this.setSelectedEachNode()
    }
  }

  @Watch('pagination')
  async chengePagination(): Promise<void> {
    this.gridApi.paginationSetPageSize(this.pagination)
  }

  deleteHandler(map: any, vm: any) {
    return {
      ...map, 8: (e: any) => {
        e.preventDefault();
      },
    }
  }

  mounted(): void {
    this.gridApi = this.gridOptions.api

    window.onresize = this.onInnerWidthChanged
    this.gridApi.sizeColumnsToFit()
    this.gridApi.paginationSetPageSize(10)
  }

  updated() {
    this.gridApi.forEachNode((node :any) => {
      node.setSelected(this.selectData[node.data[this.itemKey]])
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.table-header {
  display: flex;
  justify-content: space-between;

  .add-new-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    background: $primary;
    color: $white;
    border-radius: 6px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    height: 40px;
    margin-right: 24px;
    padding: 0px 23px;

    &:focus {
      outline: none;
    }

    .icon {
      font-size: 13px;
      margin-right: 6px;
    }

    .text {
      font-size: 16px;
      line-height: 24px;
      font-weight: bold;
    }
  }

  .icon-list {
    margin-left: 18px;

    .icon-container {
      position: relative;
      display: inline-block;

      &:hover &.tooltiptext {
        background: $grey-hover;
        border-radius: 50%;
      }

      &:hover .tooltiptext {
        visibility: visible;
      }

      .icon {
        align-items: center;
        width: 26px;
        height: 26px;
        padding: 5px;
      }
      .tooltiptext {
        visibility: hidden;
        width: 50px;
        background-color: $grey-text;
        color: $white;
        font-size: 12px;
        text-align: center;
        border-radius: 6px;

        position: absolute;
        z-index: 1;
        top: calc(100% + 4px);
        left: 50%;
        margin-left: -25px;
      }
    }
  }
}

.pagination-container {
  width: 50%;
}

.footer-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 23px;

  .dropdown {
    width: 80px;
    height: 30px;
    padding: 2px 10px;
    margin-left: 13px;
    padding: 0;
    border: 0px;

    .dropdown-option {
      display: flex;
      width: 100%;
    }

    ::v-deep .vs__clear {
      display: none;
    }

    ::v-deep .vs__selected {
      position: inherit;
    }

    ::v-deep .vs__dropdown-toggle {
      height: 100%;
      border: 1px solid $gray-disable !important;
    }

    .dropbtn {
      font-size: 14px;
    }
  }
}
</style>