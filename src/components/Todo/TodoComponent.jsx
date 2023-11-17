import { useNavigate, useParams } from 'react-router-dom'
import {RetriveFilmByid,RetriveAllFilms,UpdateFilmById,AddFilm,addVideo} from './AnimeApiService'
import { useEffect ,useState} from 'react'
import { Formik ,Form,Field, ErrorMessage} from 'formik'

export default function TodoComponent(){

    const{id} = useParams()
    const [description,setDescription] = useState('')
    const [rating,setRating] = useState()
    const [name,setName] = useState('')
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState(null);

    const navigate = useNavigate()

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
    // const handleUpload = () => {
    //     if (!file) {
    //       alert('Please select a video file');
    //       return;
    //     }
    // }
    useEffect(
        ()=> RetriveFilms(),
        [id]
    )
    function RetriveFilms(){
        if(id != -1){
        RetriveFilmByid(id)
        .then((response) => {
            setDescription(response.data[0].description)
            setRating(response.data[0].rating)
            setName(response.data[0].name)
            setFile(response.data[0].file)
            console.log("FILE" + response.data[0].file)

        })
    }
    }
    function onSubmit(values){
        console.log('sdfsfd')
        const films = {
            id: values.id,
            name : values.name,
            rating : values.rating,
            description : values.description,
            filename : null
        }
        if(values.id != -1){
        UpdateFilmById(films)
        .then((response) => {
            navigate('/todo')
        })
         }
        else{
            const formData = new FormData();
            formData.append('file', file);
        
            fetch('http://localhost:8080/video', {
              method: 'POST',
              body: formData,
            })
              .then((response) => {
                return response.text();
                // Додаткова логіка після завантаження, наприклад, оновлення інтерфейсу
              })
              .then((data) => {
                console.log('upload success', data)
                setFilename(data)
                const films = {
                    id: values.id,
                    name: values.name,
                    rating: values.rating,
                    description: values.description,
                    filename: data, // Встановлення значення filename після отримання результату від сервера
                  };
            
                console.log('fsfsd', films)
                 AddFilm(films)
                .then(() => {
                  navigate('/todo')
              })
              })
              .catch((error) => {
                console.error('Upload error:', error);
              });
            console.log('fsdfsdf',films)
             
        }
    }
    function validate(values){
        let errors = {
            // name : 'Enter valid name',
            // rating : 'Enter valid rating',
            // description : 'Enter valid description'
        }
        if(values.name.length > 20){
            errors.name =  'The name must less than 20'
        }
        if(values.name.length <= 0){
            errors.name =  'The name must be equal or greater than 1 symb'
        }
        if(values.rating == 0){
            errors.rating =  'The rating must be equal or greater than 0'
        }
        if(values.description.length > 99){
            errors.description =  'The description must be less than 99'
        }
        if(values.description.length == 0){
            errors.description =  'The description must be greater than 1 symb'
        }
        return errors
    }
    return(
        
        <div className="container">
            <h1>Enter film Details</h1>
            <div>
            <Formik initialValues={{id,name,rating, description,file}}
            enableReinitialize ={true}
            onSubmit={onSubmit}
            validate={validate}
            >
                {
                    (props)=>(
                        <Form>
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="alert alert-warning"
                            />
                            <ErrorMessage
                                name="rating"
                                component="div"
                                className="alert alert-warning"
                            />
                             <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />
                            <fieldset className="form-group">
                                <label> Name </label>
                                <Field className ="form-control" type = "text"  name ="name"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label> Rating </label>
                                <Field className ="form-control" type = "text"  name ="rating"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label> Description </label>
                                <Field className ="form-control" type = "text" name ="description"/>
                            </fieldset>
                            <div>
                            <input type="file" accept="video/*" onChange={handleFileChange} />
                                </div>
                            <div>
                                <button className="btn btn-success m-2" type ="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
            </div>
        </div>
    )
}
