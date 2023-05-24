const ENDPOINT = "/link-categories"

const getAll = async () => {
  const response = await api.get(ENDPOINT)
  return response.data
}

const getOneById = async (id) => {
  const response = await api.get(`${ENDPOINT}/${id}`)
  return response.data
}

const create = async (linkCategories) => {
  const response = await api.post(ENDPOINT, linkCategories)
  return response.data
}

const update = async (id, linkCategories) => {
  const response = await api.put(`${ENDPOINT}/${id}`, linkCategories)
  return response.data
}

const remove = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`)
  return response.data
}

const LinkCategoriesService = {
  getAll,
  getOneById,
  create,
  update,
  remove
}

export default LinkCategoriesService