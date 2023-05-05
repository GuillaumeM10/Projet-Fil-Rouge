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
  // convert the post object to a FormData object
  const formData = new FormData();

  formData.append('author', post.author)
  formData.append('content', post.content)
  formData.append('files', post.files)

  const response = await api.post(ENDPOINT, formData, { formData: true })
  
  return response.data
}



// api.post('/endpoint', formData, { formData: true })
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.log(error);
// });

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