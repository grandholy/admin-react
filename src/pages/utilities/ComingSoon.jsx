// src/ComingSoonPage.js
import React from 'react';
import { Result, Button } from 'antd';

const ComingSoonPage = () => {
    const handleBackHome = () => {
        window.location.href = '/'; // Redirect to home page
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <Result
                status="info"
                title="Coming Soon!"
                subTitle="We're working hard to bring you something amazing. Stay tuned!"
                extra={<Button type="primary" onClick={handleBackHome}>Back to Home</Button>}
            />
        </div>
    );
};

export default ComingSoonPage;