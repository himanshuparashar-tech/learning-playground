import React, { useContext } from 'react'
import { Data, Data1 } from '../pages/tabsData'


const ComponentUC_C = () => {
    const userName = useContext(Data);
    const userAge = useContext(Data1);
    return (
        <>
            <p>We do not need this call back function just add html render</p>

            <h1>My name is {userName} and the age is {userAge}</h1>
        </>
    )
}

export default ComponentUC_C