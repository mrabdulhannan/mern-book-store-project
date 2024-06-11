import React, {useState}from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //Handler to Handle Book Save Operation
  
  const handleSaveBook = () =>{
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post(`http://localhost:5555/books`,data)
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
      <h1 className='text-3xl my-4'>Create Book</h1>
      {
        loading?
        <Spinner/>:
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
        <button className='p-2 m-8 bg-sky-300 ' onClick={handleSaveBook}>
          Save
        </button>
      </div>
      
      
    </div>
  )
}
