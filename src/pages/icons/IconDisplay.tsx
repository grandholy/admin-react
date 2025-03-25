import React, { useState } from 'react';
import * as AntIcons from '@ant-design/icons';
import { Card, Row, Col, Typography, Input } from 'antd';

const { Title } = Typography;

const IconDisplay: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Get all icon names from the Ant Design Icons package
    const iconNames = Object.keys(AntIcons).filter(icon => icon.endsWith('Outlined')) as Array<keyof typeof AntIcons>;

    // Filter icons based on the search term
    const filteredIcons = iconNames.filter(iconName => 
        iconName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Ant Design Icons</Title>
            <Input
                placeholder="Search icons"
                onChange={e => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Row gutter={16}>
                {filteredIcons.map(iconName => {
                    const IconComponent = AntIcons[iconName as keyof typeof AntIcons] as React.FC<React.SVGProps<SVGSVGElement>>;
                    return (
                        <Col span={6} key={iconName}>
                            <Card style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <IconComponent style={{ fontSize: '24px', marginBottom: '10px' }} />
                                <div>{iconName}</div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default IconDisplay;
