export interface CompanyType {
  assignee: string
  companyCategory: {
    companyCategoryEn: string
    companyCategoryId: number
    companyCategoryTh: string
  }
  companyEmail: string
  companyId: number
  companyNameEn: string
  companyNameTh: string
  companyPhoneNumber: string
  companyPhonePrefix: string
  companySize: {
    companySizeEn: string
    companySizeId: number
    companySizeTh: string
  }
  companyType: {
    companyTypeEn: string
    companyTypeId: number
    companyTypeTh: string
  }
  createdAt: string
  createdBy: string
  status: number
  statusDesc: string
  updatedAt: string
  updatedBy: string
}
