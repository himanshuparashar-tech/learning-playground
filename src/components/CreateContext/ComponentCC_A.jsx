import React from 'react'
import ComponentCC_B from './ComponentCC_B';
import { ArrayData } from '../pages/ArrayData';


const ComponentCC_A = ({nameType}) => {
    
    return (
        <div>
            <ComponentCC_B nameType={ArrayData.nameType} />
        </div>
    )
}

export default ComponentCC_A