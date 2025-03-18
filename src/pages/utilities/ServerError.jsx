// src/ServerErrorPage.js
import React from 'react';
import { Result, Button } from 'antd';

const ServerErrorPage = () => {
    const handleBackHome = () => {
        window.location.href = '/'; // Redirect to home page
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong on our end."
                extra={<Button type="primary" onClick={handleBackHome}>Back to Home</Button>}
            />
        </div>
    );
};

export default ServerErrorPage;