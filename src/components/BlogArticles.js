import { Link } from "react-router-dom"
import supabase from "../config/supabaseClient"

const BlogArticles = ({ articles, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('articles')
      .delete()
      .eq('id', articles.id)

    if (error) {
      console.log(error)
    }

    if (data) {
      console.log("Deleted:", data)
      onDelete(articles.id) 
    }
  }

  return (
    <div className="articles-card">
      <h3>{articles.title}</h3>
      <p>{articles.introduction}</p>

      <div className="buttons">
        <Link to={`/${articles.id}`}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onDelete={handleDelete}>delete</i>
      </div>
    </div>
  )
}

export default BlogArticles
