import http from './shared/http'
import Brand from '@/models/brand'
import type { BaseListFilters } from './shared/types'

export type BrandListFilters = BaseListFilters

class BrandApi {
  public async list(filters: BrandListFilters = {}): Promise<Array<Brand>> {
    return await http
      .get('/v1/brands', {
        params: filters
      })
      .then((response) => response.data.data)
      .then<Brand[]>((items) => items.map((item: object) => Brand.fromJson(item)))
  }
}

export default new BrandApi()
