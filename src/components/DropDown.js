import React, { useState } from 'react'

function DropDown(props) {
    const [isOpen,setIsOpen] = useState(false)
    const [selection,setSelection] = useState('Select a sequence')
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    const onOptionClicked = value => () => {
        setSelection(value)
        setIsOpen(false)    
        console.log(selection)
    }
    const label = {
        display:'block',
        color:'#7F8BA0',
        fontSize:'14px',
        fontWeight:'400',
        textTransform:'capitalize',
        marginBottom:'8px'
    }
    const mainContainerStyle = {
        margin:'10px 0px'
    }
    const dropDownContainer = {
        width:'100%',
        textAlign:'center'
    }
    const header = {
        display:'flex',
        justifyContent:'space-between',
        alignItems:'flex-end',
        backgroundColor:'rgba(201, 202, 217, 0.19)',
        borderRadius:'3px',
        padding:'10px 15px',
        fontSize:'14px',
        color:' #4C5A73'
    }
    const dropDownBox = {}
    const list = {
        backgroundColor:'#fff',
        boxShadow:'0px 1px 16px rgba(0, 0, 0, 0.12)',
        borderRadius:'4px',
        overflow:'auto',
        padding:'0px',
        margin:'0px',
        textAlign:'left',
        width:'100%',
    }
    const item = {
        padding:'15px 15px',
        fontSize:'15px',
        listStyle:'none',
        color:'#333333'
    }
    const carrot = {
        border:'5px solid transparent',
        borderTopColor:'#7A7BAA',
    }

    return (
        <div style={mainContainerStyle}>
            <label style={label}>{props.label ? props.label : 'Custom heading'}</label>
            <div style={dropDownContainer}>
                <div style={header} onClick={toggle}>{selection}
                    <span style={carrot}></span>
                </div>
                <div style={dropDownBox}>
                    {
                        isOpen &&  
                        <ul style={list}>
                        {
                            props.options.map(option => {
                                return <li key={option} onClick={onOptionClicked(option)} style={item}>{option}</li>
                            })
                        }
                    </ul>
                    }
                </div>
            </div>
        </div>
    )
}

export default DropDown
