import FeedbackItem from "./FeedbackItem"
import { motion, AnimatePresence } from 'framer-motion'
import FeedbackContext from "../context/FeedbackContext"
import Spinner from "./shared/Spinner"
import { useContext } from "react"


function FeebackItems() {
  const {feedback, isLoading}=useContext(FeedbackContext)
  if(!isLoading && (!feedback || feedback.length===0)) return <p>No feedback yet</p>

  return isLoading?<Spinner />:(
    <div className='feedback-list'>
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
    </div>
  )
}

export default FeebackItems
