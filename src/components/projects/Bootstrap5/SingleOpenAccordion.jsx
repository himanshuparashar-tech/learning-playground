import React, { useEffect } from 'react';

const SingleOpenAccordion = () => {

  useEffect(() => {
    const headers = document.querySelectorAll('#singleAccordion .accordion-header');

    headers.forEach(header => {
      header.onclick = () => {
        const body = header.nextElementSibling;

        // CLOSE all other bodies
        document.querySelectorAll('#singleAccordion .accordion-body').forEach(b => {
          if (b !== body) {
            b.style.display = 'none';
          }
        });

        // TOGGLE the clicked one
        body.style.display = body.style.display === 'block' ? 'none' : 'block';
        body.classList.toggle("animate");
      };
    });
  }, []);

  return (
    <div className='accordion' id='singleAccordion'>

      <div className="accordion-item">
        <h2 className="accordion-header">Section 1</h2>
        <div className="accordion-body">
          Content for section 1
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header">Section 2</h2>
        <div className="accordion-body">
          Content for section 2
        </div>
      </div>

    </div>
  );
};

export default SingleOpenAccordion;
