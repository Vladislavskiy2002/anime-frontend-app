import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams,Link, Navigate } from 'react-router-dom'
import axios from 'axios'

import { AuthContext,useAuth } from './security/AuthContext'
import AuthProvider from './security/AuthContext'
import './TodoApp.css'
import WatchComponent from './WatchComponent'
import {RetriveHelloWorld,RetriveUsername,RetriveAllFilms,DeleteFilmById,UpdateFilmById,addUser,isUserExist} from './AnimeApiService'
import TodoComponent from './TodoComponent'
import PosterComponent from './PosterComponent'

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';



function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAutenticated)
    return children
    return <Navigate to = "/"/>
}

export default function TodoApp(){

    return(
            <AuthProvider>
                <BrowserRouter>
                <HeaderComponent/>
                    <Routes>
                        <Route path = '/' element = {<LoginComponent/>}></Route>
                        <Route path = '/login' element = {<LoginComponent/>}></Route>
                        <Route path = '/SignUp' element = {<SignUpComponent/>}></Route>
                        <Route path = '/todo' element = 
                        {
                            <AuthenticatedRoute>
                                {/* <TodoListComponent/> */}
                                <PosterComponent/>

                            </AuthenticatedRoute>
                        }>
                        </Route>
                        <Route path = '/todo/:id' element = 
                        {
                            <AuthenticatedRoute>
                                {/* <TodoComponent/> */}
                                <PosterComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                         <Route path = '/todo/watch/:id/:contentURL' element = 
                        {
                            <AuthenticatedRoute>
                                <WatchComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path = '/welcome/:username' element = {
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>}></Route>
                        <Route path = '/logOut' element = {
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                        <Route path = '/*' element = {<ErrorNavigateComponent/>}></Route>
                    </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
    )
}

function LoginComponent(){
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState('')

    const [showSuccesessMessage,setShowSuccesessMessage] = useState(false)
    const [showErrorMessage,setShowErrorMessage] = useState(false)

    const  navigate = useNavigate(false)
    const authContext = useAuth()


    function handleUsername(event){
        setUsername(event.target.value)
        console.log(event.target.value)
    }
    function handlePassword(event){
        setPassword(event.target.value)
        console.log(event.target.value)
    }
    async function handleSubmit(event){
        if(await authContext.login(username,password)){
            navigate(`/welcome/${username}`)
        }
        else{
            setShowErrorMessage(true)
        }
    }

    function SuccesessMessageComponent(){
        if(showSuccesessMessage){
            return(
                <div className='SuccesessMessage' > Authentificate Successfully</div>
            )
        }
    }
    function ErrorMessageComponent(){
        if(showErrorMessage){
            return(
                <div className='red fw-bold mb-2 text-center' > Error: Bad Credentials</div>
            )
        }
    }
    return(
        // <div className="Login">
        //     <ErrorMessageComponent/>
        //     <div className="form-outline mb-4">
        //         <label>User name: </label>
        //         <input type="text" name = "username" class="form-control" value={username} onChange={handleUsername}/>
        //     </div>
        //     <div>
        //         <label class="form-label" for="form2Example2">Password</label>
        //         <input type="password" name = "password" id="form2Example2" class="form-control" value={password} onChange={handlePassword}/>
        //     </div>
        //     <button type="button" name = "login" class="btn btn-primary btn-block mb-4" onClick={handleSubmit}>login</button>
        // </div>
            <MDBContainer fluid>
              <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
        
                  <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>
        
                      <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                      <p className="text-white-50 mb-3">Please enter your login and password!</p>
                      <ErrorMessageComponent/>
                      <MDBInput wrapperClass='mb-4 w-100' placeholder='Username' id='formControlLg' type='username' size="lg" value={username} onChange={handleUsername}/>
                      <MDBInput wrapperClass='mb-4 w-100' placeholder='Password' id='formControlLg' type='password' size="lg" value={password} onChange={handlePassword}/>
        
                      <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
                      <button type="button" name = "login" class="btn btn-primary btn-block mb-4" onClick={handleSubmit}>login</button>
                
                      {/* <hr className="my-4" />
        
                      <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                        <MDBIcon fab icon="google" className="mx-2"/>
                        Sign in with google
                      </MDBBtn>
        
                      <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                        <MDBIcon fab icon="facebook-f" className="mx-2"/>
                        Sign in with facebook
                      </MDBBtn> */}
        
                    </MDBCardBody>
                  </MDBCard>
        
                </MDBCol>
              </MDBRow>
        
            </MDBContainer>
    )
}
function SignUpComponent(){
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [check,setCheck] = useState(null)

    const [showSuccesessMessage,setShowSuccesessMessage] = useState(false)
    const [showErrorMessage,setShowErrorMessage] = useState(false)
    const [showUserWithUsernameAlreadyExistErrorMessage,setUserWithUsernameAlreadyExistErrorMessage] = useState(false)

    const  navigate = useNavigate(false)


    function handleUsername(event){
        setUsername(event.target.value)
        console.log(username)
    }
    function handlePassword(event){
        setPassword(event.target.value)
        console.log(event.target.value)
    }
    function handleEmail(event){
        setEmail(event.target.value)
        console.log(event.target.value)
    }
    function checkUserOnExist(username){
        isUserExist(username).then(
            (responce)=>{
            console.log("RESPONCE: " + responce.data)
            if(responce.data === false){
                console.log("false")
                if(addUser(username,password,email)){
                    navigate(`/login`)
                }
                else{
                    setShowErrorMessage(true)
                }
                return true;
            }
            else{
                setUserWithUsernameAlreadyExistErrorMessage(true)
                return false;
            }
        })
    }
        function handleSubmit(){
            checkUserOnExist(username)
    }

    function SuccesessMessageComponent(){
        if(showSuccesessMessage){
            return(
                <div className='SuccesessMessage' > Authentificate Successfully</div>
            )
        }
    }
    function ErrorMessageComponent(){
        if(showErrorMessage){
            return(
                <div className='ErrorMessage' > Register error</div>
            )
        }
    }
    function UserHasAlreadyExistErrorMessageComponent(){
        if(showUserWithUsernameAlreadyExistErrorMessage){
            return(
                <div className='ErrorMessage' > User with current username has already exist</div>
            )
        }
    }
    return(
        // <div className="SignUp">
        //     <UserHasAlreadyExistErrorMessageComponent/>
        //     <div className="form-outline mb-4">
        //         <label>User name: </label>
        //         <input type="text" name = "username" class="form-control" value={username} onChange={handleUsername}/>
        //     </div>
        //     <div>
        //         <label class="form-label" for="form2Example2">Password</label>
        //         <input type="password" name = "password" id="form2Example2" class="form-control" value={password} onChange={handlePassword}/>
        //     </div>
        //     <div>
        //         <label class="form-label" for="form2Example2">email</label>
        //         <input type="email" name = "email" id="form2Example3" class="form-control" value={email} onChange={handleEmail}/>
        //     </div>
        //     <button type="button" name = "login" class="btn btn-primary btn-block mb-4" onClick={handleSubmit}>login</button>
        // </div>
        <MDBContainer fluid>
              <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
        
                  <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>
    
                      <h2 className="fw-bold mb-2 text-center">Sign up</h2>
                      <p className="text-white-50 mb-3">Please enter your login and password!</p>
                      <UserHasAlreadyExistErrorMessageComponent/>
                      <MDBInput wrapperClass='mb-4 w-100' placeholder='Email' id='formControlLg' type='email' size="lg" value={email} onChange={handleEmail}/>                  
                      <MDBInput wrapperClass='mb-4 w-100' placeholder='Username' id='formControlLg' type='username' size="lg" value={username} onChange={handleUsername}/>
                      <MDBInput wrapperClass='mb-4 w-100' placeholder='Password' id='formControlLg' type='password' size="lg" value={password} onChange={handlePassword}/>

                      <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
                      <button type="button" name = "login" class="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Sign up</button>
                
                      {/* <hr className="my-4" />
        
                      <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                        <MDBIcon fab icon="google" className="mx-2"/>
                        Sign in with google
                      </MDBBtn>
        
                      <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                        <MDBIcon fab icon="facebook-f" className="mx-2"/>
                        Sign in with facebook
                      </MDBBtn> */}
        
                    </MDBCardBody>
                  </MDBCard>
        
                </MDBCol>
              </MDBRow>
        
            </MDBContainer>
    )
}
function TodoListComponent(){
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
    navigate(`/todo/watch/${id}/${contentURL}`)
}
function AddFilm(id){
    // console.log("click")
    navigate(`/todo/${-1}`)
}
    return(
        <div className='container'> 
            <h1>Films </h1>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            {/* <th>id</th> */}
                            <th>name</th>
                            <th>rating</th>
                            <th>description</th>
                            <th>Delete</th>
                            <th>Update</th>
                            <th>Watch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    {/* <td>{todo.id}</td> */}
                                    <td>{todo.name}</td>
                                    <td>{todo.rating.toString()}</td>
                                    <td>{todo.description}</td>
                                    <td><button className='btn btn-warning' onClick={()=>DeleteFilm(todo.id)}>Delete</button></td>
                                    <td><button className='btn btn-success'onClick={()=>UpdateFilm(todo.id)}>Update</button></td>
                                    <td><button className='btn btn-dark'onClick={()=>WatchFilm(todo.id,todo.contentURL)}>Watch</button></td>
                                 </tr>
                            )
                          )
                        }
                        <button className='btn btn-success'onClick={()=>AddFilm()}>Add film</button>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
function ErrorNavigateComponent(){
    return(
        <div className='ErrorMessagePageNotFound' > <h1>404 Sorry, but page isn't found</h1></div>
    )
}
function HeaderComponent(){

    const authContext = useContext(AuthContext)
    const isAutenticated = authContext.isAutenticated
    const username = authContext.username

    function logout(){
        authContext.logout()
    }
    return(
        <div>
        {/* <header className="border-bottom border-light border-5 mb-5 p-2"> */}
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.youtube.com/watch?v=Wx7vo__48oE&ab_channel=%D0%9E%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%9F%D0%BE%D0%BD%D0%BE%D0%BC%D0%B0%D1%80%D1%8C%D0%BE%D0%B2">Anime</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">{isAutenticated && <Link className="nav-link" to="/welcome/Vladi">Home</Link>}</li>
                                <li className="nav-item fs-5">{isAutenticated && <Link className="nav-link" to="/todo">Movies</Link>}</li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">{!isAutenticated &&<Link className="nav-link" to="/login">Login</Link>}</li>
                            <li className="nav-item fs-5">{!isAutenticated &&<Link className="nav-link" to="/SignUp">Sign up</Link>}</li>
                            <li className="nav-item fs-5">{isAutenticated &&<Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>}</li>
                        </ul>
                    </nav>
                </div>
            </div>
        {/* </header> */}
        </div>
    )
}
function FooterComponent(){
    return(
            <div className='footer' style={{ width: '0px', height: '0px' }}>
            
            </div>
    )
}
function LogoutComponent(){
    return(
        <div className='LogoutComponent' > fdsfsf </div>
    )
}
function WelcomeComponent(){
    const authContext = useContext(AuthContext)
    const username = authContext.username
    const email = authContext.email

    // const {username} = useParams()
    const [message,setMessage] = useState()
    function CallHelloWorldRestApi(){
        RetriveUsername('usesf')
            .then((responce) => SuccesessResponse(responce))
            .catch((error)=>ErrorResponse(error))
            .finally(()=>console.log('cleanup'))
    }
    function SuccesessResponse(responce){
        setMessage(responce.data)
        console.log(responce)
    }
    function ErrorResponse(responce){
        console.log(responce)
        setMessage(responce.data)
    }
    return(
        <>
            <div className="Welcome">
                <h1>Welcome {username}</h1>
            </div>
            <div>
                 <button className= "btn btn-success m5" onClick={CallHelloWorldRestApi}>
                    Call Hello World
                 </button>
                 <br/>
                 {message}
            </div>
        </>
    )
}