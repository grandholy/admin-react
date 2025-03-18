// src/NotificationDemo.js
import { Button, notification, Modal } from 'antd';

const NotificationDemo = () => {
    const openNotification = (type) => {
        notification[type]({
            message: `This is a ${type} notification`,
            description: `This is the description for a ${type} notification.`,
            placement: 'topRight',
        });
    };

    const showModal = (type) => {
        Modal[type]({
            title: `${type.charAt(0).toUpperCase() + type.slice(1)} Dialog`,
            content: (
                <div>
                    <p>This is a {type} dialog.</p>
                    <p>Some additional information can go here.</p>
                </div>
            ),
            onOk() {
                console.log(`${type} dialog closed`);
            },
            onCancel() {
                console.log(`${type} dialog canceled`);
            },
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Ant Design Notification and Dialog Demo</h1>
            <h2>Notifications</h2>
            <Button type="primary" onClick={() => openNotification('success')}>Success Notification</Button>
            <Button type="primary" onClick={() => openNotification('info')}>Info Notification</Button>
            <Button type="primary" onClick={() => openNotification('warning')}>Warning Notification</Button>
            <Button type="primary" onClick={() => openNotification('error')}>Error Notification</Button>

            <h2 style={{ marginTop: '20px' }}>Dialogs</h2>
            <Button type="primary" onClick={() => showModal('info')}>Info Dialog</Button>
            <Button type="primary" onClick={() => showModal('success')}>Success Dialog</Button>
            <Button type="primary" onClick={() => showModal('warning')}>Warning Dialog</Button>
            <Button type="primary" onClick={() => showModal('error')}>Error Dialog</Button>
        </div>
    );
};

export default NotificationDemo;