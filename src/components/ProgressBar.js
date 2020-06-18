import React from 'react'
import PropTypes from 'prop-types'

const ProgresBar = (props) => {
    const { percent} = props

    return (
        <div className="progress-bar">
            <div className="progress" style={{width : `${percent}%`}}>
                <span className="progress-label">{percent}%</span>
            </div>
        </div>
    )
}

ProgresBar.propTypes = {
    percent: PropTypes.number.isRequired
}

export default ProgresBar