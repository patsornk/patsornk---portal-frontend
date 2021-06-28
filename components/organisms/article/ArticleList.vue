<template>
  <div>
    <div class="filter-container">
      <div class="search-group">
        <input-field
          v-model="filterData.keyword"
          class="filter"
          :placeholder="$t('article.placeholder.searchBy')"
          :should-be-error="false"
        />
      </div>

      <div class="dropdown-group">
        <input-field
          v-model="filterData.author"
          class="filter"
          :placeholder="$t('article.table.author')"
          type="select"
          :should-be-error="false"
          :options="authorList"
          :options-reduce="(item) => item.authorId"
          :options-label="language === 'th' ? 'authorTh' : 'authorEn'"
          :searchable="false"
          :map-keydown="deleteHandler"
        />
        <input-field
          v-model="filterData.status"
          class="filter"
          :placeholder="$t('article.table.status')"
          type="select"
          :should-be-error="false"
          :options="statusList"
          :optionsReduce="(item) => item.id"
          optionsLabel="status"
          :searchable="false"
          :map-keydown="deleteHandler"
        />
        <div class="btn-group">
          <div class="clear-all" @click="clearFilter">
            {{ $t('userManagement.clearAll') }}
          </div>
          <t1-button class="black btn-search" @click.native="search">
            {{ $t('common.search').toString() }}
          </t1-button>
        </div>
      </div>
    </div>
    <table-component
      v-model="selectData"
      item-key="id"
      :header-title="$t('article.articles').toString()"
      :raw-data="dataList"
      is-show-paginate
      is-show-header-table
      is-show-check-box
      is-show-data-not-found-icon
      is-show-data-not-found-text
      :is-show-active="false"
      :is-show-icon-hold="false"
      :is-show-inactive="false"
      :is-loading="isLoading"
      :data-not-found-text="$t('table.dataNotFound')"
      :column-defs="columnDefs"
      :current-page="currentPage"
      :on-row-clicked="onRowClicked"
      :page-count="pageSize"
      :selected-item="selectData.length"
      :total-item="totalItem"
      :total-page="pageSize"
      @onChenagePage="changePage"
      @pagination="changPageSize"
      @clickDelete="onTableIconClick"
    />
    <dialog-popup
      :display="dialogDisplay"
      :title="dialogTitle"
      :description="dialogDescription"
      :left-button-title="dialogLeftButtonText"
      :right-button-title="dialogRightButtonText"
      @onLeftButtonClick="onLeftDialogPopupClick"
      @onRightButtonClick="onRightDialogPopupClick"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import T1Dropdown from '@/components/atoms/dropdown.vue'
import T1Button from '@/components/atoms/button.vue'
import InputField from '@/components/atoms/InputField.vue'
import TableComponent from '~/components/molecules/table-component/TableComponent.vue'
import CustomHeader from '~/components/atoms/AgCustomHeader'
import InputSearch from '~/components/atoms/InputSearch.vue'
import InputDate from '~/components/atoms/InputDate.vue'
import DialogPopup from '~/components/molecules/DialogPopup.vue'
import { OrganizationManagementStatus } from '~/constants'

enum OrganizationTableCol {
  CompTitle = 'title',
  CompAuthor = 'author',
  CompArticleTag = 'articleTag',
  CompArticleType = 'articleType',
  CompPublishDate = 'publishDate',
  CompStatus = 'status'
}

@Component({
  components: {
    TableComponent,
    InputField,
    T1Dropdown,
    T1Button,
    InputSearch,
    DialogPopup,
    InputDate
  }
})
export default class OrganizationTable extends Vue {
  $i18n: any

  get language(): any {
    return this.$i18n.locale
  }

  @Watch('language')
  changeSerchSelect(): void {
    this.searchList = [
      {
        id: 'company',
        label: `${this.$t('common.searchBy')} ${this.$t('common.companyTitle')}`
      },
      {
        id: 'partnerCode',
        label: `${this.$t('common.searchBy')} ${this.$t(
          'common.partnerCodeTitle'
        )}`
      }
    ]
  }

  frameworkComponents = {
    agColumnHeader: CustomHeader
  }

  dialogAction = ''
  dialogDisplay = false
  dialogTitle = ''
  dialogDescription = ''
  dialogLeftButtonText = ''
  dialogRightButtonText = ''

  isLoading = true

  tableOderField = ''
  tableOderBy = ''
  currentPage = 1
  selectData = []
  pageSize = 0
  totalItem = 0
  inputType = 'text'
  clickSearch = false
  clickSort = false
  searchList = [{}]

  filterData = {
    keyword: '',
    articleType: 0,
    author: 0,
    publishDateFrom: '',
    publishDateTo: '',
    status: 0
  }

  private pagination = 10
  private articleTypeList: any = []
  private authorList: any = []
  private statusList = [
    {
      id: -1,
      status: `${this.$t('article.status.allStatus')}`
    },
    {
      id: 1,
      status: `${this.$t('article.status.published')}`
    },
    {
      id: 2,
      status: `${this.$t('article.status.unPublished')}`
    },
    {
      id: 3,
      status: `${this.$t('article.status.draft')}`
    },
    {
      id: 4,
      status: `${this.$t('article.status.waitingForApproval')}`
    },
    {
      id: 5,
      status: `${this.$t('article.status.rejected')}`
    },
    {
      id: 6,
      status: `${this.$t('article.status.scheduled')}`
    }
  ]

  dataList = []
  columnDefs = [
    {
      headerValueGetter: (): string => {
        return this.$t('article.table.title').toString()
      },
      field: 'title',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompTitle,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.title}
                </div>`
      },
      minWidth: 350
    },
    {
      headerName: this.$t('article.table.author').toString(),
      field: 'author',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompAuthor,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.author}
                </div>`
      }
    },
    {
      headerName: this.$t('article.table.articleTag').toString(),
      field: 'articleTag',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompArticleTag,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.articleTag}
                </div>`
      }
    },
    {
      headerName: this.$t('article.table.articleType').toString(),
      field: 'articleType',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompArticleType,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.articleType}
                </div>`
      }
    },
    {
      headerName: this.$t('article.table.publishDate').toString(),
      field: 'publishDate',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompPublishDate,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.publishDate}
                </div>`
      }
    },
    {
      headerName: this.$t('common.status').toString(),
      field: 'status',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompStatus
      },
      cellRenderer: (params: any) => {
        let strFormat = ''
        params.data.status === this.$t('article.status.published').toString()
          ? (strFormat = 'published')
          : params.data.status ===
            this.$t('article.status.unPublished').toString()
          ? (strFormat = 'un-published')
          : params.data.status === this.$t('article.status.draft').toString()
          ? (strFormat = 'draft')
          : params.data.status ===
            this.$t('article.status.waitingForApproval').toString()
          ? (strFormat = 'waiting-for-approval')
          : params.data.status === this.$t('article.status.rejected').toString()
          ? (strFormat = 'rejected')
          : (strFormat = 'scheduled')
        return `<div class="custom-row">
                  <span class='row-status ${strFormat}'>${params.data.status}</span>
                </div>`
      },
      minWidth: 190
    }
  ]

  private sortingList(data: any, order: any): void {
    this.clickSort = true
    this.clickSearch = false
    if (data.colKey === 'status') {
      return
    }
    if (this.tableOderField === data.colKey) {
      if (this.tableOderBy === 'asc') {
        this.tableOderBy = 'desc'
      } else {
        this.tableOderBy = 'asc'
      }
    } else {
      this.tableOderField = data.colKey
      this.tableOderBy = 'asc'
    }
    this.currentPage = 1
    this.selectData = []
    this.filterArticles(
      1,
      this.pagination,
      this.tableOderField,
      this.tableOderBy
    )
  }

  clearFilter() {
    this.filterData = {
      keyword: '',
      articleType: 0,
      author: 0,
      publishDateFrom: '',
      publishDateTo: '',
      status: 0
    }
  }

  private search(): void {
    this.clickSearch = true
    this.clickSort = false
    this.tableOderField = ''
    this.tableOderBy = ''
    this.currentPage = 1
    this.filterArticles(1, this.pagination)
    this.selectData = []
  }

  changPageSize(pagination: number): void {
    this.pagination = pagination
    this.currentPage = 1
    if (this.clickSearch || this.clickSort) {
      this.filterArticles(1, pagination, this.tableOderField, this.tableOderBy)
    } else {
      this.getAryicles(1, pagination)
    }
  }

  onRowClicked(row: any): void {
    // this.$router.push(`/article/${row.data.id}`)
  }

  async mounted(): Promise<void> {
    await this.getArticleType()
    await this.getAuthor()
    this.currentPage = 1
    this.getAryicles(1, 10)
    this.changeSerchSelect()
  }

  changePage(page: number): void {
    this.currentPage = page
    if (this.clickSearch || this.clickSort) {
      this.filterArticles(
        page,
        this.pagination,
        this.tableOderField,
        this.tableOderBy
      )
    } else {
      this.getAryicles(page, this.pagination)
    }
  }

  async filterArticles(
    page: number,
    limit: number,
    sortBy?: string,
    sortDirection?: string
  ): Promise<void> {
    this.isLoading = true
    let path = `/list_company?page=${page}&limit=${limit}`

    if (sortBy) {
      path = `${path}&sortBy=${sortBy}`
    }
    if (sortDirection) {
      path = `${path}&sortDirection=${sortDirection}`
    }
    if (this.filterData.keyword !== '') {
      path = `${path}&keyword=${this.filterData.keyword}`
    }
    if (this.filterData.articleType > 0) {
      path = `${path}&articleType=${this.filterData.articleType}`
    }
    if (this.filterData.author > 0) {
      path = `${path}&author=${this.filterData.author}`
    }
    if (this.filterData.status > 0) {
      path = `${path}&status=${this.filterData.status}`
    }

    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}${path}`,
        { data: null }
      )
      if (res.successful) {
        this.mappingArticle(res.data)
        this.currentPage = page
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
    this.isLoading = false
  }

  async getAryicles(page: number, limit: number): Promise<void> {
    this.isLoading = true
    try {
      // const res = await this.$axios.$get(
      //   `${process.env.PORTAL_ENDPOINT}/list_article?page=${page}&limit=${limit}`,
      //   { data: null }
      // )
      // if (res.successful) {
      //   this.mappingArticle(res.data)
      //   this.currentPage = page
      // }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
    this.isLoading = false
  }

  async getArticleType(): Promise<void> {
    try {
      // const res = await this.$axios.$get(
      //   `${process.env.PORTAL_ENDPOINT}/get_company_type`,
      //   { data: null }
      // )
      // if (res.successful) {
      //   this.articleTypeList = res.data.companyType
      // }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getAuthor(): Promise<any> {
    try {
      // const res = await this.$axios.$get(
      //   `${process.env.PORTAL_ENDPOINT}/get_company_size`,
      //   { data: null }
      // )
      // if (res.successful) {
      this.authorList = [
        {
          authorEn: 'All',
          authorTh: 'ทั้งหมด',
          authorId: -1
        }
        // ...res.data.author
      ]
      // }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async deleteArticle(articles: any[]): Promise<void> {
    const articleIds: any[] = []
    articles.forEach((article: any) => {
      articleIds.push(article.id)
    })
    try {
      // const response = await this.$axios.$delete(
      //   `${process.env.PORTAL_ENDPOINT}/delete_company`,
      //   { data: { companyId: companyIds } }
      // )
      // if (response.successful) {
      //   this.getAryicles(this.currentPage, this.pagination)
      //   this.$toast.global.success(this.$t('table.deletedSuccessfully'))
      //   this.filterData = {
      //     keyword: '',
      //     articleType: 0,
      //     author: 0,
      //     publishDateFrom: '',
      //     publishDateTo: '',
      //     status: 0
      //   }
      // }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  mappingArticle(data: any): void {
    data.totalPage = 1
    data.total = 6

    this.pageSize = data.totalPage
    this.totalItem = data.total
    this.dataList = data.article.map((item: any) => {
      const statusStr = this.statusList.filter((e) => e.id === item.status)[0]
        .status
      return {
        id: item.id,
        title: item.title,
        author: item.author,
        articleTag: item.articleTag,
        articleType: item.articleType,
        publishDate: item.publishDate,
        status: statusStr
      }
    })
  }

  deleteHandler(map: any, vm: any): any {
    return {
      ...map,
      8: (e: any) => {
        e.preventDefault()
      }
    }
  }

  onTableIconClick(action: string): void {
    this.dialogDisplay = true
    this.dialogLeftButtonText = this.$t('table.dialogPopup.cancel').toString()
    this.dialogAction = OrganizationManagementStatus.DELETE
    this.dialogRightButtonText = this.$t('table.dialogPopup.delete').toString()
    this.dialogDescription = this.$t('table.dialogPopup.description').toString()
    this.dialogTitle = `${this.$t('table.dialogPopup.title4')} ${
      this.selectData.length
    } ${this.$t('table.dialogPopup.title5')}`
  }

  onLeftDialogPopupClick(): void {
    this.dialogDisplay = false
  }

  onRightDialogPopupClick(): void {
    this.deleteArticle(this.selectData)
    this.selectData = [] // comment this line for continues select after status changed
    this.dialogDisplay = false
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.filter-container {
  margin: 24px 0px 24px 24px;

  .search-group {
    align-items: center;
    margin-top: 14px;
  }

  .dropdown-group {
    display: grid;
    grid-template-columns: 25% 25% 50%;
    align-items: center;

    .btn-group {
      display: flex;
      justify-content: flex-end;
      margin-right: 20px;

      .clear-all {
        cursor: pointer;
        text-decoration: underline;
        color: $grey-text;
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        margin-top: 12px;
        margin-right: 28px;
        text-align: right;
      }

      .btn-search{
        width: 157px;
      }
    }
  }

  .filter {
    margin-right: 20px;
  }
}
</style>
