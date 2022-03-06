import React from 'react'
import { Fade } from 'react-reveal';
import { Button } from 'antd'
import { Link } from 'react-router-dom'


function HomePage() {
    return (
        <>
            <div className="home-container">
                <div className="header">
                    <Fade left>
                        <h1 id="home-header" style={{ color: '#fafafa' }}><span style={{ color: '#66b8f4' }}>LEN</span>DAILY</h1>
                        <Link to="/shop"><Button id="home-button">Order Now</Button></Link>
                    </Fade>

                </div>
                <div className="blur-cover">

                </div>
            </div>
        </>
    )
}

export default HomePage