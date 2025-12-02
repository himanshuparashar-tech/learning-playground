import React from 'react'
import ComponentCC_BM from './ComponentCC_BM';
import { ArrayData } from '../pages/ArrayData';


const ComponentCC_AM = ({ nameType }) => {

    return (
        <div>
            <ComponentCC_BM nameType={ArrayData.nameType} />
        </div>
    )
}

export default ComponentCC_AM