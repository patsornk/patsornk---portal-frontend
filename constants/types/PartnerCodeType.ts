export interface SiebelPartnerType {
  id: number
  partnerId: number
  partnerCode: string
  partnerName: string
}

export interface ErrorSiebelPartner {
  partnerCode: string | undefined
  partnerName: string
}
