import http from './shared/http'
import Category from '@/models/category'

class CategoryApi {
  public async list(): Promise<Array<Category>> {
    return await http
      .get('/v1/categories')
      .then((response) => response.data.data)
      .then<Category[]>((items) => items.map((item: object) => Category.fromJson(item)))
  }
}

export default new CategoryApi()
