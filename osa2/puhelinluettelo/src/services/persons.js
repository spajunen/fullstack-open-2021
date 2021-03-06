import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
  .catch(error => {
    console.log('fail')
  })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
  .catch(error => {
    console.log('fail')
    console.log(error.response.data.error)
    throw Error(error.response.data.error)
    
  })
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
  .catch(error => {
    console.log('fail')
    throw Error('User not found')
  })
}

const remove = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
    .catch(error => {
      console.log('fail')
    })
  }

export default { getAll, create, update, remove }