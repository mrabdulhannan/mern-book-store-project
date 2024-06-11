import React, {useState, useEffect}from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate , useParams} from 'react-router-dom';

export default function EditBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
 

  //To Show the Prepopulated data
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response)=>{
        
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error)=>{
        setLoading(false);
        console.log(error);
        alert("There is an error on Updating Book")
        
      })
      // [] if we do not add this the page is getting refreshed again and again
  },[])

   //Handler to Handle Book Edit Operation
  const handleEditBook = () =>{
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`,data)
      .then(()=>{
        setLoading(false);
        navigate('/');
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false);
        alert("An Error happened. Please check Console");
      })

  };
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {
        loading?
        '':
        ''
      }
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
          typeof='text'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className='border-2 border-gray-500  px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
          typeof='text'
          value={author}
          onChange={(e)=>setAuthor(e.target.value)}
          className='border-2 border-gray-500  px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>publishYear</label>
          <input
          typeof='number'
          value={publishYear}
          onChange={(e)=>setPublishYear(e.target.value)}
          className='border-2 border-gray-500  px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 m-8 bg-sky-300 ' onClick={handleEditBook}>
          Save
        </button>
      </div>
      
      
    </div>
  )
}
