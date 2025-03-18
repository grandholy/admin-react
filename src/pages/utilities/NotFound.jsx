// src/NotFoundPage.js
import React from 'react';
import { Result, Button } from 'antd';

const NotFoundPage = () => {
    const handleBackHome = () => {
        window.location.href = '/'; // Redirect to home page
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={handleBackHome}>Back to Home</Button>}
            />
        </div>
    );
};

export default NotFoundPage;