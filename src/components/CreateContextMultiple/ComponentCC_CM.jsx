import React from 'react'
import { Data, Data1 } from '../pages/tabsData'
import { ArrayData } from '../pages/ArrayData'


const ComponentCC_CM = () => {
    return (
        <div>
            <Data.Consumer>
                {(nameType) => {
                    return (
                        <Data1.Consumer>
                            {(age) => {
                                return (
                                    <h2 className='font-bold text-2xl text-red-400'>My name is <small>{ArrayData.nameType}</small> <small>{ArrayData.ageType}</small></h2>
                                );
                            }}
                        </Data1.Consumer>
                    )
                }}
            </Data.Consumer>
        </div>
    )
}

export default ComponentCC_CM