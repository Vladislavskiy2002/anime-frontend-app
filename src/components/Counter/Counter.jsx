import { useState } from "react"
import CounterButton from "./CounterButton"
export default function Counter(){

    const [count, SetCount] = useState(0)

    function incrementCounterFunction(by){
        SetCount(count + by)
    }
    function decrementCounterFunction(by){
        SetCount(count - by)
    }
    function resetCounterFunction(by){
        SetCount(0)
    }
    return(
        <div>
            <span className="Count">{count}</span>
            <div>
                <CounterButton by = {1} incrementMethod={incrementCounterFunction} decrementMethod={decrementCounterFunction}/>
                <CounterButton by = {2} incrementMethod={incrementCounterFunction} decrementMethod={decrementCounterFunction}/>
                <CounterButton by = {5} incrementMethod={incrementCounterFunction} decrementMethod={decrementCounterFunction}/>
                <button className='counterButton'onClick={resetCounterFunction}>Reset</button>
            </div>
        </div>
    )
  }
  