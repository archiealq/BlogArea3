import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

//components for parts of site 
import BlogArticles from "../components/BlogArticles"

const Home = (token) => {
  console.log(supabase)
  const [fetchError, setFetchError] = useState(null)
  const [articles, setArticles] = useState(null)

  const handleDelete = (id) => {
    setArticles(oldArticle => {
      return oldArticle.filter(sm => sm.id !== id)
    })
  }

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('articles')
        .select()

      if (error){
        setFetchError('Couldnt fetch articles')
        setArticles(null)
        console.log(error)
      }

      if(data){
           console.log(data)
        setArticles(data)
        setFetchError(null)
      }

    }

    fetchArticles()
    
  }, [])
  return (
  <div className="page home">
 
     <div className="container centered">
        <h1>Welcome to BlogPost</h1>
        <p>Share your thoughts. Start writing today.</p>
      </div>
    {fetchError && (<p>{fetchError}</p>)}
    {articles && (
      <div className="articles">
        <div className="articles-grid"> 
          {articles.map(articles => (
              <BlogArticles key={articles.id} articles={articles} onDelete={handleDelete} />
           ))}
        </div>
      </div>
    )}
  </div>
)
}

export default Home