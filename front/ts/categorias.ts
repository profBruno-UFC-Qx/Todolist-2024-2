
async function getAllCategory(): Promise<StrapiResponse<Category>> {
  const res = await api.get('/categories/')
  return res.data
}