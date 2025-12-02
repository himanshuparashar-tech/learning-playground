import React from 'react'
import ComponentC from './ComponentC'
import { ArrayData } from '../pages/ArrayData'

const ComponentB = ({ nameType }) => {
    return (
        <div>
            <ComponentC nameType={ArrayData.nameType} />
        </div>
    )
}

export default ComponentB