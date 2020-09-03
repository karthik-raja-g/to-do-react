import React from 'react'
import styles from './OwnerInfo.module.css'
function OwnerInfo(props) {
    return (
        <div className={styles.info+" row p-3"}>
            <div className="col-lg-2">
                <img src='/assets/images/user.svg' className="img-fluid" alt="owner"/>    
            </div>
            <div className="col-lg-9 text-left">
                <p >{props.name}</p>      
            </div>
        </div>
    )
}

export default React.memo(OwnerInfo)
