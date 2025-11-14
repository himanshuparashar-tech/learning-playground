import React from 'react';

const AccordionJavascript = () => {
    return (
        <div>
            <div className="accordion-box">
                <div className="accordion-header">
                    <button className="accordion-btn">Section 1</button>
                    <span className='icon'>&#9660;</span>
                </div>
                <div className="accordion-body">
                    <p>This is section 1 content</p>
                </div>
            </div>
            <div className="accordion-box">
                <div className="accordion-header">
                    <button className="accordion-btn">Section 2</button>
                    <span className='icon'>&#9660;</span>
                </div>
                <div className="accordion-body">
                    <p>This is section 2 content</p>
                </div>
            </div>
        </div>
    )
}

export default AccordionJavascript  