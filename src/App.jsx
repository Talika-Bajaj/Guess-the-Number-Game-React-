import { useForm } from "react-hook-form"
import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100) + 1)
  // console.log(randomNum);
  const [message, setMessage] = useState('')

  const showMessage = useRef();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()



  const onSubmit = (data) => {

    // console.log(data.number);
    const num = parseInt(data.number)

    if (isNaN(num)) {
      setMessage('Please enter a valid number');
      return;
    }


    if (num === randomNum) {
      setMessage(`YOU GUESSED IT RIGHT! YOUR NUMBER WAS ${randomNum}`);
      setRandomNum(Math.floor(Math.random() * 100) + 1)
    } else if (num > randomNum) {
      setMessage('YOU GUESSED TOO HIGH, TRY AGAIN');
    } else {
      setMessage('YOU GUESSED TOO LOW, TRY AGAIN');
    }

    showMessage.current.style.display = 'block';
  }


  return (
    <>
      <main>

        <h1>Guess The Number?</h1>
        <form className='num-form' onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor="num">Guess a Number between 1 to 100</label>
          <input type="text" id="num"
            {...register('number', {
              required: { value: true, message: 'This field cannot be empty' }, minLength: { value: 1, message: 'Value should atleast be 1' }, maxLength: { value: 3, message: 'Value should be atmost 100' }, pattern: { value: /^[0-9]*$/, message: 'Please enter a valid number' }
            })} />

          {errors.number && <div className="error">{errors.number.message}</div>}
          <input type="submit" value="Submit" id="submit-guess" />

        </form>
        <div className="msg" ref={showMessage}>{message}</div>
      </main>

    </>
  )
}

export default App
