import React from 'react'
import ComponentB from './ComponentB';
import { ArrayData } from '../pages/ArrayData';


const ComponentA = ({nameType}) => {
    
    return (
        <div>
            <ComponentB nameType={ArrayData.nameType} />
        </div>
    )
}

export default ComponentA