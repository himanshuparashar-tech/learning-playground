import React, { useState } from 'react';
import Searchbar from '../Search-Block/Searchbar';
import { SearchFilter } from '../Search-Block/SearchFilter';

const AccordionIcon = ({ isOpen }) => (

    <svg
        className={`w-6 h-6 stroke-[var(--text-secondary)] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const AccordionItem = ({ item, isOpen, onClick }) => (
    <div className="border-b border-[var(--border)] last:border-b-0">
        <button
            className="w-full flex justify-between items-center text-left py-4 px-5 
                 hover:bg-[var(--hover-bg)] rounded transition"
            onClick={onClick}
        >
            <span className="text-lg font-medium text-[var(--text)]">
                {item.question}
            </span>

            <AccordionIcon isOpen={isOpen} />
        </button>

        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0"
                }`}
        >
            <div className="p-5 pt-0 text-[var(--text-secondary)]">
                <div className="whitespace-pre-line">{item.answer}</div>
            </div>
        </div>
    </div>
);

const FaqSection = ({ title, subtitle, data }) => {
    const [openIndex, setOpenIndex] = useState(null);
    const [search, setSearch] = useState("");

    // FIlter Logic for Search
    const filteredData = SearchFilter(data, search, "question");  // ⬅ USE IT HERE

    return (
        <>
            {/* React FAQ */}
            <div className="flex items-center justify-center p-1 lg:p-4 bg-[var(--bg-secondary)]">
                <div className="w-full max-w-full mx-auto bg-[var(--bg)] rounded-2xl shadow border border-[var(--border)] overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-center text-[var(--text)]">
                            {title}
                        </h1>
                        <p className="text-center text-[var(--text-secondary)]">
                            {subtitle}
                        </p>

                        {/* SEARCH BAR */}
                        <div className="mt-6 mb-4 w-full">
                            <Searchbar
                                value={search}
                                onChange={setSearch}
                                placeholder="Search FAQs..."
                            />
                        </div>
                    </div>

                    <div style={{ maxHeight: "calc(100vh - 280px)", overflow: "auto" }}>

                        {/* If No Result Found */}
                        {filteredData.length === 0 && (
                            <p className="text-center text-[var(--text-secondary)] p-6">
                                No matching questions found.
                            </p>
                        )}
                        {filteredData.map((item, index) => (
                            <AccordionItem
                                key={index}
                                item={item}
                                isOpen={openIndex === index}
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                            />
                        ))}
                    </div>
                </div >
            </div >
        </>
    );
};

export default FaqSection;
