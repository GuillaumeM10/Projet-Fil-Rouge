import api from "./api.service";

const ENDPOINT = "/users-details"

const update = async (id, userDetail) => {
  const formData = new FormData();

  if(userDetail.contactEmail) formData.append('contactEmail', userDetail.contactEmail) 
  if(userDetail.country) formData.append('country', userDetail.country)
  if(userDetail.status) formData.append('status', userDetail.status)
  if(userDetail.formation) formData.append('formation', userDetail.formation)
  if(userDetail.description) formData.append('description', userDetail.description)
  if(userDetail.range) formData.append('range', userDetail.range)
  if(userDetail.school) formData.append('school', userDetail.school)
  if(userDetail.displayedOnFeed) formData.append('displayedOnFeed', userDetail.displayedOnFeed)

  if(userDetail.skills) formData.append('skills', JSON.stringify(userDetail.skills))
  if(userDetail.experiences) formData.append('experiences', JSON.stringify(userDetail.experiences))
  if(userDetail.cities) formData.append('cities', JSON.stringify(userDetail.cities))
  if(userDetail.links) formData.append('links', JSON.stringify(userDetail.links))

  const fileType = (name, filesObj) => {
    const files = Array.from(filesObj)

    files.forEach((file, index) => {
      formData.append(name, file)
    })
  }
  if(userDetail.files) fileType('files', userDetail.files)
  if(userDetail.cv) fileType('cv', userDetail.cv)
  if(userDetail.banner) fileType('banner', userDetail.banner)
  if(userDetail.personalPicture) fileType('personalPicture', userDetail.personalPicture)

  const response = await api.put(`${ENDPOINT}/${id}`, formData, { formData: true })

  console.log({"response": response.data});
  return response.data
}

const UserDetailService = {
  update
}

export default UserDetailService