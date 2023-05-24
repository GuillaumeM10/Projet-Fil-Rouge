import api from "./api.service"

const ENDPOINT = "/comments"

const getAll = async () => {
  const response = await api.get(ENDPOINT)
  return response.data
}

// const getAllByAuthor = async (author) => {
//   const response = await api.get(`${ENDPOINT}?author=${author}`)
//   return response.data
// }

const getOneById = async (id) => {
  const response = await api.get(`${ENDPOINT}/${id}`)
  return response.data
}

const create = async (comment) => {
  const response = await api.post(ENDPOINT, comment)
  return response.data
}

const update = async (id, comment) => {
  const response = await api.put(`${ENDPOINT}/${id}`, comment)
  return response.data
}

const remove = async (id) => {
  const response = await api.delete(`${ENDPOINT}/${id}`)
  return response.data
}

const CommentService = {
  getAll,
  // getAllByAuthor,
  getOneById,
  create,
  update,
  remove
}

export default CommentService