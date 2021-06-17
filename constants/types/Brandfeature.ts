export interface BrandInitialData {
  brandId: number
  brandNameTh: string
  brandNameEn: string
}

export interface BrandFeatureInitialData {
  image: any
  imageUrl?: string
  showDisplay: any
  ctaLabel: string
  ctaType: any
  ctaFeature: string
}

export interface BrandFeatureError {
  ctaLabel: string
  ctaType: string
  ctaFeature: string
  image?: string
}
