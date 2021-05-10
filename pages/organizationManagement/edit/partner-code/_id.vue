<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import OrganizationTable from '~/components/organisms/table/OrganizationTable.vue'
import { BreadcrumbType, CompanyType } from '~/constants'

@Component({
  components: {
    T1Button,
    OrganizationTable
  }
})
export default class CompanyEditPartnerCode extends Vue {

}