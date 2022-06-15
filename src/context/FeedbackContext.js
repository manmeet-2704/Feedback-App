import { createContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid'
import FeedbackData from "../data/FeedbackData"
const FeedbackContext=createContext()

export const FeedbackProvider=({children})=>{

  const [feedback, setFeedback] = useState(FeedbackData)
  const [feedbackEdit, setFeedbackEdit]=useState({
    item:{},
    edit: false
  })

  const editFeedback=(item)=>{
    setFeedbackEdit({item, edit: true})
  }

  const updateFeedback=(updatedItem,id)=>{
    setFeedback(feedback.map(item=>item.id==id?{...item, ...updatedItem}:item))
  }
  const handleDelete=(id)=>{
    if(window.confirm('Are you sure you want to delete the review?'))
    setFeedback(feedback.filter(item=>item.id!=id))
  }
  const handleAdd = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  return <FeedbackContext.Provider value={{
    feedback,
    handleDelete,
    handleAdd,
    editFeedback,
    feedbackEdit,
    updateFeedback
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext
