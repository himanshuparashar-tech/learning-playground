import React from 'react'
import { ArrayData } from '../pages/ArrayData'
import { Data } from '../pages/tabsData'


const ComponentCC_C = () => {
    return (
        <div>
            <Data.Consumer>
                {
                    (nameType) => {
                        return <h4>{nameType}</h4>

                    }
                }
            </Data.Consumer>
        </div>
    )
}

export default ComponentCC_C