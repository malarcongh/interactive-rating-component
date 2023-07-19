import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

import StarIcon from '../assets/icon-star.svg';
import Illustration from '../assets/illustration-thank-you.svg';


export default function RatingCard() {

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [activeScoreRef, setActiveScoreRef] = useState(null);
  const cardContainerRef = useRef(null);
  const cardContainerHeight = isSubmitted ? cardContainerRef.current.offsetHeight: 'unset';


  useEffect(() => {
    if(!activeScoreRef) return;
    activeScoreRef.classList.add('selected');
  }, [activeScoreRef])

  function onScoreClickHandler(e){
    if(!e.target.closest('.score-item')) return;
    setScore(e.target.innerText);
    setActiveScoreRef(prev => {
      if(prev) prev.classList.remove('selected');
      return e.target;
    })
  }

  function onSubmitHandlder(){
    if(score === null) return;
    setIsSubmitted(true)
  }


  return (
    <div className="card-container" style={{height: cardContainerHeight}} ref={cardContainerRef}>
      <AnimatePresence mode='wait'>
        {!isSubmitted ? 
          <motion.div
            key={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: 75, opacity: 0, transition: { duration: 0.3} }}
          >
            <div className="rating-card">
              <div className="icon-container">
                <img src={StarIcon} alt="Rating card" />
              </div>
              <h1 className="card-title">How did we do?</h1>
              <p className="card-text">Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!</p>
              <div className="score-container" onClick={onScoreClickHandler}>
                <div>
                  <span className='score-item'>1</span>
                </div>
                <div>
                  <span className="score-item">2</span>
                </div>
                <div>
                  <span className="score-item">3</span>
                </div>
                <div>
                  <span className="score-item">4</span>
                </div>
                <div>
                  <span className="score-item">5</span>
                </div>
              </div>
              <button className="submit-btn" onClick={onSubmitHandlder}>Submit</button>
            </div>
          </motion.div>
        :
          <motion.div
            initial={{ opacity: 0, y: -50}}
            animate={{ opacity: 1, y: 0}}
            transition={{duration: .3 }}
          >
            <div className='submitted-card'>
              <div className="illustration-container">
                <img src={Illustration} alt="" />
              </div>
              <div className="submitted-score-container">
                {`You selected ${score} out of 5`}
              </div>
              <h1 className="submitted-card-title">Thank you!</h1>
              <p className="submitted-card-text">We appreciate you taking the time to give a rating. If you ever need more support, don't hesitate to get in touch!</p>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}
