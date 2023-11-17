export default function CounterButton({by,incrementMethod,decrementMethod}){

    function incrementCounterFunction(){
        incrementMethod(by)
    }
    function decrementCounterFunction(){
        decrementMethod(by)
    }
    return(
        <div>
            <div>
                <button className='counterButton'onClick={incrementCounterFunction}>+{by}</button>
                <button className='counterButton'onClick={decrementCounterFunction}>-{by}</button>
            </div>
        </div>
    )
  }