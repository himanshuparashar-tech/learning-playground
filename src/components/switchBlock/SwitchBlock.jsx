
import React, { useState } from 'react'

const SwitchBlock = () => {
    const [sw, setSw] = useState(false);


    return (
        <div>
            {sw ? (
                <span>Dark</span>
            ) : (
                <span>Light</span>
            )}

            <br />

            <input className="cstm-input" type="text" key={sw ? 'dark' : 'light'} />
            <button className="cstm" type='button' onClick={() => setSw((s) => !s)}>Switch</button>
        </div>
    )
}

export default SwitchBlock