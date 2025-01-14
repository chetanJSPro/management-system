import React from 'react'
export default function Header(props) {
    return (
        <div className='container-fluid head text-white align-content-center'>
            <h1 className='text-center'>{props.title}</h1>
        </div>
    )
}
