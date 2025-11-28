import React from 'react';
import { createPortal } from 'react-dom'

const PopUpContent = ({ copied }) => {

    return createPortal(
        <section>
            {copied && (
                <div style={{ position: 'absolute', bottom: '3rem', right: '1rem', backgroundColor: '#00ff0050', color: '#fff', borderRadius: '8px', transform: 'translateY(-20px)', transition: 'all 0.5s EaseInOut', padding: '5px' }}>
                    copied to clipboard
                </div>
            )}
        </section>,
        document.querySelector("#popup-content")
    )
}

export default PopUpContent