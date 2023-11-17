import { BrowserRouter, Routes, Route, useNavigate, useParams,Link, Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import {RetriveHelloWorld,RetriveUsername,RetriveAllFilms,DeleteFilmById,UpdateFilmById,addUser,isUserExist} from './AnimeApiService'
import { AuthContext,useAuth } from './security/AuthContext'
import './PosterComponent.css'

export default function PosterComponent(){
    const authContext = useAuth()
    const navigate = useNavigate()
    const [todos, setTodos] = useState([])
    useEffect(
        ()=> refreshTodos()
    )
function refreshTodos(){
    RetriveAllFilms()
        .then((responce) => {
        console.log(responce.data[0].contentURL)
        setTodos(responce.data)})
            .catch((error)=>console.log(error))
            .finally(()=>console.log('cleanupe'))
    }
function DeleteFilm(id){
    DeleteFilmById(id)
    .then(
        refreshTodos()
    )
}
function UpdateFilm(id){
    console.log("click")

    navigate(`/todo/${id}`)
}
function WatchFilm(id,contentURL){
    console.log("click WatchFilm")
    console.log("id" + id)
    console.log("contentURL" + contentURL)

    navigate(`/todo/watch/${id}/${contentURL}`)
}
function AddFilm(id){
    // console.log("click")
    navigate(`/todo/${-1}`)
}
    return(
        <div className='container'> 
      <div className='poster-container'>
        {todos.map(todo => (
          <div key={todo.id} className='poster-item'>
            <div className='poster-img-container'>
              <img className='posterimg' src={todo.picture} alt='Movie Poster'  onClick={() => WatchFilm(todo.id, todo.contentURL)}/>
              <div className='poster-text'>
              <p>{todo.name}</p>
            </div>
            </div>
          </div>
        ))}
      </div>
      <button className='btn btn-success' onClick={() => AddFilm()}>Add film</button>
    </div>
    )
}