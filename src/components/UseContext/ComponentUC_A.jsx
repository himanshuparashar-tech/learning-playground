import React from 'react'
import ComponentUC_B from './ComponentUC_B';
import { ArrayData } from '../pages/ArrayData';


const ComponentUC_A = ({ nameType }) => {

    return (
        <div>
            <ComponentUC_B nameType={ArrayData.nameType} />
        </div>
    )
}

export default ComponentUC_A