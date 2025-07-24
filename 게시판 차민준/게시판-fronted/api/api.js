import axios from 'axios'

const baseUrl = import.meta.env.VITE_APP_API_URL

const api = axios.create({
   baseURL: baseUrl,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
})

export const registerMember = async (memberData) => {
   try {
      const response = await api.post('/auth/join', memberData)
      return response
   } catch (error) {
      console.error(`API request 오류 : ${error}`)
      throw error
   }
}

export const loginMember = async (credential) => {
   try {
      console.log('credential : ', credential)
      const response = await api.post('/auth/login', credential)

      console.log('response : ', response)
      return response
   } catch (error) {
      console.error(`API Request 오류 : ${error}`)
      throw error
   }
}

export const logoutMember = async () => {
   try {
      const response = await api.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류 : ${error}`)
      throw error
   }
}

export const checkAuthStatus = async () => {
   try {
      const response = await api.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류 : ${error}`)
      throw error
   }
}

export const boardWrite = async (writeData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }

      const response = await api.post('/board/write', writeData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류 : ${error}`)
      throw error
   }
}

export const getBoards = async (page) => {
   try {
      const response = await api.get(`/board/read?page=${page}`)
      return response
   } catch (error) {
      console.error(`API Request 오류 : ${error}`)
      throw error
   }
}

export const DeleteBoards = async (id) => {
   try {
      const response = await api.delete(`/board/delete/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류 : ${error}`)
      throw error
   }
}

export const updateBoard = async (id, boardData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      }
      const response = await api.put(`/board/edit/${id}`, boardData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error}`)
      throw error
   }
}
