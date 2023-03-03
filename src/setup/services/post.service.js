import api from "./api.service"

const ENDPOINT = "/posts"

const getAll = async () => {
  const response = await api.get(ENDPOINT)
  return response.data
}

const getAllByAuthor = async (author) => {
  const response = await api.get(`${ENDPOINT}?author=${author}`)
  return response.data
}

const getOneById = async (id) => {
  const response = await api.get(`${ENDPOINT}/${id}`)
  return response.data
}

const create = async (post) => {
  const response = await api.post(ENDPOINT, post)
  return response.data
}

const update = async (id, post) => {
  const response = await api.put(`${ENDPOINT}/${id}`, post)
  return response.data
}

const remove = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`)
  return response.data
}

const PostService = {
  getAll,
  getAllByAuthor,
  getOneById,
  create,
  update,
  remove
}

export default PostService