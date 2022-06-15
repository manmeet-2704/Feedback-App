import FeedbackItem from "./FeedbackItem"
import { motion} from 'framer-motion'
import FeedbackContext from "../context/FeedbackContext"
import { useContext } from "react"


function FeebackItems() {
  const {feedback, handleDelete}=useContext(FeedbackContext)
  return (
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
