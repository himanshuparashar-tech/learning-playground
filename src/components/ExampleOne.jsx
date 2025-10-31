import React, { useState } from 'react'
import { InteractiveDemo } from './InteractiveDemo';
import { InteractiveDemoVisual } from './InteractiveVisualDemo';

const ExampleOne = () => {
    const [count, setCount] = useState(() => {
        const initialCount = 10;
        return initialCount;
    })

    const increment = () => {
        setCount(count => count + 1);
    }

    const [countNormal, setCountNormal] = useState(0);
    const [countFunctional, setCountFunctional] = useState(0);

    // Normal increment (may fail if called multiple times in a row)
    const incrementNormalTwice = () => {
        setCountNormal(countNormal + 1);
        setCountNormal(countNormal + 1);
        console.log("Normal count after 2 increments:", countNormal);
    };

    // Functional increment (always correct)
    const incrementFunctionalTwice = () => {
        setCountFunctional(c => c + 1);
        setCountFunctional(c => c + 1);
        console.log("Functional count after 2 increments:", countFunctional);
    };

    return (
        <div style={{ maxHeight: 'calc(100vh - 275px)' , overflow: 'auto'}}>
            <h6 className='font-semibold'>Example One With lazy initializer</h6>
            <ul>
                <li>If you pass a function instead of a value, React will call that function only once — the very first time the component renders</li>
                <li>
                    {/* const [count, setCount] = useState(() => {
                        console.log("Initializing count...");
                    return 5; // or any computed value
                    }); */}
                    That’s called lazy initialization — it "lazily" runs the function only when needed.
                </li>
                <li className='font-semibold'>Why it is useful?</li>
                <li>The function runs only once (on the first render).

                    If you had written useState(localStorage.getItem("count")), it would try to read localStorage every time the component re-renders, which is inefficient.</li>
            </ul>
            <p>
                Count: {count}
            </p>

            <button className='cstm m-1' onClick={increment}>Increment</button>
            <br />
            <br />

            <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
                <h2>Normal Counter (may fail)</h2>
                <p>{countNormal}</p>
                <button className='cstm m-1' onClick={incrementNormalTwice}>Increment Twice</button>

                <hr style={{ margin: "20px 0" }} />

                <h2>Functional Counter (always correct)</h2>
                <p>{countFunctional}</p>
                <button className='cstm m-1' onClick={incrementFunctionalTwice}>Increment Twice</button>
            </div>

            <br />
            <br />
            <h6 className='font-semibold'>Example One With Interactive Demo</h6>
            <InteractiveDemo />

            <br />
            <br />
            <h6 className='font-semibold'>Example One With Interactive Demo Visual</h6>
            <InteractiveDemoVisual />
        </div>
    )
}

export default ExampleOne