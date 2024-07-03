import { ref } from 'vue'
import http from './shared/http'
import Product from '@/models/product'

export type ProductListFilters = {
  page?: number
  limit?: number
  sortBy?: string
  desc?: boolean
  category?: string
  price?: number
  brand?: string
  title?: string
}

class ProductApi {
  public async list(filters: ProductListFilters = {}): Promise<Array<Product>> {
    return await http
      .get('/v1/products', <any>filters)
      .then((response) => response.data.data)
      .then<Product[]>((items) => items.map((item: object) => Product.fromJson(item)))
  }
}

export default new ProductApi()
