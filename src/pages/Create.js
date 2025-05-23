import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [body, setBody] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!title || !introduction || !body){
      setFormError('Fill up all fields')
      return
    }

    // adds data to db

    const { data, error } = await supabase
      .from('articles')
      .insert([{ title, introduction, body }])
    
    if (error){
      console.log(error)
      setFormError('Fill up all fields')
    }

    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="introduction">Introduction:</label>
        <textarea 
          id="introduction"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />

        <label htmlFor="body">Body:</label>
        <input 
          type="text"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button>Post Article</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create