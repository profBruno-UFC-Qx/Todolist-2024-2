interface StrapiResponse<T> {
  data: T[]
  meta: Pagination
}

interface StrapiResponseSingle<T> {
  data: T
  meta: Pagination
}

interface Pagination {
  page: number,
  pageSize: number,
  pageCount: number,
  total: number
}

interface Task {
  documentId?: string,
  description: string,
  done: boolean,
  deadline?: string,
  category: Category
}

interface Category {
  documentId: string,
  description: string
}
