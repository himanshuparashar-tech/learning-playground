import React from 'react';
import { ArrayData } from "./ArrayData";
import FaqSection from "./FaqSection";

const Faq = () => {
    return (
        <>
            <FaqSection
                title="React FAQ"
                subtitle="Here are some of our most asked questions."
                data={ArrayData.accordionData1}
            />

            <br />

            <FaqSection
                title="Javascript FAQ"
                subtitle="Here are some JS related questions."
                data={ArrayData.accordionData2}
            />
        </>
    );
};

export default Faq;
