export interface SiebelPartnerType {
  partnerId: number
  partnerCode: string
  partnerName: string
}

export interface ErrorSiebelPartner {
  partnerCode: string | undefined
  partnerName: string
}
