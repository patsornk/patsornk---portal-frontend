export interface TitleArticleData {
  titleTh: string
  subTitleTh: string
  titleEn: string
  subTitleEn: string
}

export interface ErrorTitleArticleData {
  titleTh: string
  titleEn: string
}

export interface NormalArticleTagData {
  category: CategoryTag[]
  topic: TopicTag[]
}

export interface ErrorNormalArticleTagData {
  category: string
  topic: string
}

export interface CategoryTag {
  id: number
  category: string
  child: Child[]
  isSelected?: boolean
}

export interface Child {
  id: number
  role: string
  isSelected?: boolean
}

export interface TopicTag {
  id: number
  topic: string
  isSelected?: boolean
}

export interface ErrorNormalArticlePublish {
  publish: string
  expire: string
}

export interface NormalArticleAuthorData {
  author: number
  thumbnailUrl: string
}


