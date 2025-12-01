import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTabs } from './tabsData.jsx';

export default function TabsViewFancy() {
    const [activeTab, setActiveTab] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");

    // add per-tab view mode (either 'preview' or 'code')
    const [viewMode, setViewMode] = useState({ 1: 'preview' });
    const setTabView = (tabId, mode) => setViewMode(prev => ({ ...prev, [tabId]: mode }));

    // ensure newly selected tabs default to 'preview'
    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        setViewMode(prev => ({ ...prev, [tabId]: 'preview' }));
    };

    // obtain tabs (computed in separate module)
    const tabs = getTabs();

    const filteredTabs = tabs.filter(tab => tab.name.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {

        if (activeTab) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 400);
            return () => clearTimeout(timer);
        }
    }, [activeTab]);

    // console.log(tabs.find(tab => tab.id === activeTab), ';;;;;;;;');


    return <div className='p-3 w-full mx-auto'>
        { }
        <div className='flex flex-col lg:flex-row gap-6 rounded-xl'>
            { }
            <div className='max-w-full lg:w-64 flex lg:flex-col rounded-xl bg-black/5 dark:bg-white/5 backdrop-filter backdrop-blur-lg pr-2' >

                <div className="searchBar">
                    {/* Search Bar */}
                    <input
                        type="text"
                        placeholder="Search tabs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="my-3 px-3 py-2 rounded-lg border outline-none text-sm bg-white border-purple-500 border-2 w-full scrollbar-gradient "
                    />
                </div>


                <div className="overflow-y-auto " style={{ maxHeight: 'calc(100vh - 216px)' }}>
                    {filteredTabs.map(tab =>
                        <button key={tab.id} onClick={() => handleTabClick(tab.id)} className={`
                    relative group flex flex-wrap break-words items-center sm:w-full lg:px-4 lg:py-3 px-2 py=2 min-w-[200px] transition-all
                    ${activeTab === tab.id ? 'text-white dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'}`}>
                            { }
                            {activeTab === tab.id && <motion.div layoutId='tabBackground' className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg  ' initial={{
                                opacity: 0
                            }} animate={{
                                opacity: 1
                            }} transition={{
                                duration: 0.2
                            }} />}

                            { }
                            <div className='flex text-left items-center z-10'>
                                {/* <span className='text-xl'>{tab.icon}</span> */}
                                <p className='font-medium text-sm'>{tab.name}</p>
                            </div>

                            { }
                            {activeTab === tab.id ? <motion.div layoutId='activeDot' className='absolute right-3 w-2 h-2 rounded-full bg-white' initial={{
                                scale: 0
                            }} animate={{
                                scale: 1
                            }} transition={{
                                delay: 0.1
                            }} /> : <div className='absolute right-3 w-2 h-2 rounded-full bg-gray-400/0 group-hover:bg-gray-400/30 transition-colors' />}
                        </button>)
                    }
                    {filteredTabs.length === 0 && (
                        <p className="text-center text-sm text-gray-400 py-4">No Tabs Found</p>
                    )}
                </div>
            </div>

            { }
            <div className='flex-1 relative rounded-xl bg-white dark:bg-gray-200/80 backdrop-filter backdrop-blur-lg shadow-lg overflow-auto fancy-view' style={{ maxHeight: 'calc(100vh - 160px) ', minHeight: 'calc(100vh - 278px)' }}>
                { }
                <AnimatePresence>
                    {isLoading && <motion.div key='loader' className='absolute inset-0 z-20 flex items-center justify-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm' initial={{
                        opacity: 0
                    }} animate={{
                        opacity: 0.7
                    }} exit={{
                        opacity: 0
                    }} transition={{
                        duration: 0.2
                    }}>
                        <svg className='animate-spin h-8 w-8 text-indigo-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                        </svg>
                    </motion.div>}
                </AnimatePresence>

                { }
                <AnimatePresence mode='wait'>
                    <motion.div key={activeTab} initial={{
                        opacity: 0,
                        x: 10
                    }} animate={{
                        opacity: 1,
                        x: 0
                    }} exit={{
                        opacity: 0,
                        x: -10
                    }} transition={{
                        duration: 0.3
                    }} className='p-6 bg-white'>
                        <h3 className='text-lg font-semibold flex items-center gap-2 mb-4 text-gray-900 dark:text-white'>
                            <span>{tabs.find(t => t.id === activeTab)?.icon}</span>
                            <span>{tabs.find(t => t.id === activeTab)?.name}</span>
                        </h3>

                        {/* If this tab supports code/preview, show a small toggle */}
                        {tabs.find(tab => tab.id === activeTab)?.type === 'codePreview' ? <>
                            <div className='mb-4 flex justify-between items-center gap-2'>
                                <button
                                    className={`px-3 py-1 rounded ${(viewMode[activeTab] || 'preview') === 'code' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-gray-100 '}`}
                                    onClick={() => setTabView(activeTab, 'code')}
                                >💻 Code</button>
                                <button
                                    className={`px-3 py-1 rounded ${(viewMode[activeTab] || 'preview') === 'preview' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-gray-100 '}`}
                                    onClick={() => setTabView(activeTab, 'preview')}
                                >👀 Preview</button>

                            </div>

                            {/* render selected view */}
                            {(viewMode[activeTab] || 'preview') === 'code' ? (
                                <pre className='rounded bg-gray-100  p-4 overflow-auto text-sm ' style={{ maxHeight: 'calc(100vh - 275px)' }} >
                                    <code>{tabs.find(tab => tab.id === activeTab).code}</code>
                                </pre>
                            ) : (
                                <div className='prose dark:prose-invert'>
                                    {tabs.find(tab => tab.id === activeTab).preview}
                                </div>
                            )}
                        </> : (
                            <div className='prose dark:prose-invert'>
                                {tabs.find(tab => tab.id === activeTab)?.content || tabs[0].content}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    </div>;
}