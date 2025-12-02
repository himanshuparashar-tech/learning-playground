import React, { useEffect } from 'react'

const BasicEffect = () => {

    useEffect(() => {
         console.log('Yes the component is rendering')
    }, [])

    return (
        <div>
            <h2>Please see the console</h2>
        </div>
    )
}

export default BasicEffect