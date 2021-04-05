export interface Author {
  name: string
  url: string
  avatar: string
  sign: string
}

export interface Score {
  key: string
  name: string
  realName: string
  author: string
  image: string
  desc: string
  bilibili: string
  hasPDF?: boolean
  hasMIDI?: boolean
  hasMUSESCORE?: boolean
}
