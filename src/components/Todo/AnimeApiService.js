import axios from "axios";

export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const RetriveHelloWorld = () => apiClient.get("/go")
export const RetriveUsername = (username) => apiClient.get(`/go/${username}`)
export const RetriveFilmByid = (id) => apiClient.get(`/film/${id}`)
export const RetriveAllFilms = () => apiClient.get("/film")
export const DeleteFilmById = (id) => apiClient.delete(`/film/${id}`)
export const UpdateFilmById = (film) => apiClient.put(`/film`,film)
export const AddFilm = (film) => apiClient.post(`/film`,film)
export const executeToken = (username,password) => apiClient.post(`/auth/generateToken`,{"username" : username,"password": password});
export const addUser = (username,password,email) => apiClient.post(`/auth/addNewUser`,{"name" : username,"password": password, "email" : email, "roles": "ROLE_USER"});
export const isUserExist = (username) => apiClient.post(`/auth/isUserExistByName`,{"username" : username});  
export const addVideo = (formData) => apiClient.post(`/video`,formData, {headers: {"Content-Type" : "multipart/form-data"}});  

