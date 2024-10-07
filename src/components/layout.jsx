import React from 'react'
import Nav from './nav'
import Topnav from './topnav'

export default function Layout({ children }) {
    return (

        <main className='row h-100 '>
            <Topnav />
            <Nav />
            {children}
        </main>
    )
}
