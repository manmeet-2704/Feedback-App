import React, { useContext, useState , useEffect} from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import Rating from './Rating'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackForm() {
  const {handleAdd, feedbackEdit, updateFeedback}=useContext(FeedbackContext)
  const [text, setText]=useState('')
  const [rating, setRating]=useState(10)
  const [btnDisabled, setBtnDisabled]=useState(true)
  const [message, setMessage]=useState('')

  useEffect(()=>{
    if(feedbackEdit.edit){
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  },[feedbackEdit])

  const handleTextChange=(e)=>{
    if(text==''){
      setBtnDisabled(true)
      setMessage(null)
    }else if(text.trim().length<10){
      setBtnDisabled(true)
      setMessage('Text must be atleast 10 characters')
    }else{
      setBtnDisabled(false)
      setMessage(null)
    }
    setText(e.target.value)
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(text.trim().length>10){
      const newFeedback={
        text,
        rating
      }
      if(feedbackEdit.edit){
        updateFeedback(newFeedback, feedbackEdit.item.id)
      }
      else handleAdd(newFeedback)
      setText('')
      setRating(10)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <Rating select={setRating} selected={rating}/>
        <div className="input-group">
          <input type="text" placeholder='Write a review' onChange={handleTextChange} value={text}/>
          <Button type='submit' isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
