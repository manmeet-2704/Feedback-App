import {FaTimes, FaEdit} from 'react-icons/fa'
import Card from "./shared/Card"
import FeedbackContext from '../context/FeedbackContext'
import { useContext } from 'react'
function FeedbackItem({item}) {
  const {handleDelete, editFeedback}=useContext(FeedbackContext)
  return (  
    <Card reverse={false}>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={()=>handleDelete(item.id)}>
        <FaTimes color='purple'/>
      </button>
      <button className="edit"><FaEdit color='purple'  onClick={()=>editFeedback(item)}/></button>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}

export default FeedbackItem
