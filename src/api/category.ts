import http from './shared/http'
import Category from '@/models/category'
import type { BaseListFilters } from './shared/types'

export type CategoryListFilters = BaseListFilters

class CategoryApi {
  public async list(filters: CategoryListFilters = {}): Promise<Array<Category>> {
    return await http
      .get('/v1/categories', { params: filters })
      .then((response) => response.data.data)
      .then<Category[]>((items) => items.map((item: object) => Category.fromJson(item)))
  }
}

export default new CategoryApi()
