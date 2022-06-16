import { createContext, useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import FeedbackData from "../data/FeedbackData"
const FeedbackContext=createContext()

export const FeedbackProvider=({children})=>{
  const [isLoading, setIsLoading]=useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit]=useState({
    item:{},
    edit: false
  })

  useEffect(()=>{
    fetchFeedback()
  },[])

  const fetchFeedback=async ()=>{
    const response=await fetch("/feedback?_sort=id&_order=desc")
    const data=await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  const editFeedback=(item)=>{
    setFeedbackEdit({item, edit: true})
  }

  const updateFeedback=async (updatedItem,id)=>{
    const response=await fetch(`/feedback/${id}`,{method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedItem)
  })
    const data=await response.json()
    setFeedback(feedback.map(item=>item.id==id?{...item, ...data}:item))
  }
  const handleDelete=async (id)=>{
    if(window.confirm('Are you sure you want to delete the review?')){
      await fetch(`/feedback/${id}`,{method: 'DELETE'})
      setFeedback(feedback.filter(item=>item.id!=id))
    }
  }
  const handleAdd = async (newFeedback) => {
    const response=await fetch('/feedback',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback)
    })
    const data=await response.json()
    setFeedback([data, ...feedback])
  }

  return <FeedbackContext.Provider value={{
    feedback,
    handleDelete,
    handleAdd,
    isLoading,
    editFeedback,
    feedbackEdit,
    updateFeedback
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext
