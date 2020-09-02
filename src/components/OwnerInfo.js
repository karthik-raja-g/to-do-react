import React from 'react'
function OwnerInfo(props) {
    return (
        <div className="text-left p-3 d-flex">
            <img src='/assets/images/pic1.png' className="img-fluid" alt="owner"/>    
            <p>{props.name}</p>      
        </div>
    )
}

export default React.memo(OwnerInfo)
