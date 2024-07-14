import * as React from 'react'
import { mainContainer } from './maincontainer.module.css'

const MainContainer = ({ children }) => {
    return (
        <div className={mainContainer}>
            {children}
        </div>
    )
}

export default MainContainer