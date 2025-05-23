import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [body, setBody] = useState('')
  const [formError, setFormError] = useState(null)

  

  // gets spefic article of select card
  useEffect(() => {
    const fetchArticle = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        console.error(error)
        navigate('/')
      } else {
        setTitle(data.title)
        setIntroduction(data.introduction)
        setBody(data.body)
      }
    }

    fetchArticle()
  }, [id, navigate])

  // pushes updated article to db
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !introduction || !body) {
      setFormError('Please fill in all fields')
      return
    }

    const { data, error } = await supabase
      .from('articles')
      .update({ title, introduction, body })
      .eq('id', id)
      .select()

    if (error) {
      console.error(error)
      setFormError('Failed to update article')
    } else {
      console.log('Updated article:', data)
      setFormError(null)
      navigate('/')
    }
  }

  return (
    <div className="page update">
      <h2>Update - {id}</h2>
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
        <textarea 
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        <button type="submit">Update Article</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update
