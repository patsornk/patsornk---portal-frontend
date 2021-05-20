<template>
  <div class="company-info-container">
    <div class="header-box">
      <div class="text-header">Company Information</div>
      <img
        class="edit"
        :src="assets('company-detail/edit.png')"
        @click="editCompany"
      />
    </div>
    <div class="data-box">
      <text-info title="Company Name (TH)" :value="company.companyNameTh" />
      <text-info title="Company Name (EN)" :value="company.companyNameEn" />
      <text-info
        title="Company Type"
        :value="
          language === 'en'
            ? company.companyType.companyTypeEn
            : company.companyType.companyTypeTh
        "
      />
      <text-info
        title="Partner Category"
        :value="
          language === 'en'
            ? company.companyCategory.companyCategoryEn
            : company.companyCategory.companyCategoryTh
        "
      />
      <text-info
        title="Business Size"
        :value="
          language === 'en'
            ? company.companySize.companySizeEn
            : company.companySize.companySizeTh
        "
      />
      <text-info title="Assignee" :value="company.assignee" />
      <text-info title="Email" :value="company.companyEmail" />
      <text-info
        title="Phone Number"
        :value="company.companyPhonePrefix + company.companyPhoneNumber"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TextInfo from '@/components/atoms/TextInfo.vue'
import { CompanyType } from '~/constants'
import { getAssetsPath } from '~/helper/images'

@Component({
  components: { TextInfo }
})
export default class CompanyInformation extends Vue {
  $i18n: any

  @Prop({
    required: true,
    type: Object
  })
  private company?: CompanyType

  get language(): any {
    return this.$i18n.locale
  }

  editCompany() {
    this.$router.push(`/organizationManagement/edit/company/${this.company?.companyId}`)
  }

  assets(name: string) {
    return getAssetsPath(name)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.company-info-container {
  padding: 38px 36px;
  .header-box {
    display: flex;
    justify-content: space-between;

    .text-header {
      font-size: 24px;
      font-weight: 700;
    }

    .edit {
      cursor: pointer;
      object-fit: contain;
    }
  }

  .data-box {
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 60px;
    grid-row-gap: 15px;
    padding: 15px 10% 0px 0px;
  }
}
</style>
