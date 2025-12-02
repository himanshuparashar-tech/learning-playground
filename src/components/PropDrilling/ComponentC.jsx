import React from 'react'
import { ArrayData } from '../pages/ArrayData'

const ComponentC = ({nameType}) => {
    return (
        <div>
            <h1>{ArrayData.nameType}</h1>
        </div>
    )
}

export default ComponentC