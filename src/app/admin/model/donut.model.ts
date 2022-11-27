export interface Donut {
  id?:number
  name:string
  icon:string
  price:number
  description:string
  promo?: 'new'|'limited'
}
