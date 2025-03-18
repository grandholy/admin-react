import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { Line, Bar, Pie, Area, Column, Radar, Scatter, Funnel, Gauge } from '@ant-design/charts';

const data = [
    { name: 'Page A', value: 4000 },
    { name: 'Page B', value: 3000 },
    { name: 'Page C', value: 2000 },
    { name: 'Page D', value: 2780 },
    { name: 'Page E', value: 1890 },
    { name: 'Page F', value: 2390 },
    { name: 'Page G', value: 3490 },
];

const ChartsPage = () => {
    const [showData, setShowData] = useState({}); // State to manage visibility of data

    const toggleDataVisibility = (chartName) => {
        setShowData((prev) => ({
            ...prev,
            [chartName]: !prev[chartName],
        }));
    };

    const lineConfig = {
        data,
        xField: 'name',
        yField: 'value',
        point: {
            size: 5,
            shapeField: 'diamond',
        },
    };

    const barConfig = {
        data,
        xField: 'name',
        yField: 'value',
    };

    const pieConfig = {
        data,
        angleField: 'value',
        colorField: 'name',
        radius: 0.8,
    };

    const areaConfig = {
        data,
        xField: 'name',
        yField: 'value',
    };

    const columnConfig = {
        data,
        xField: 'name',
        yField: 'value',
    };

    const radarConfig = {
        data,
        xField: 'name',
        yField: 'value',
        meta: {
            name: { alias: 'Category' },
            value: { alias: 'Value' },
        },
    };

    const scatterConfig = {
        data: data.map((item, index) => ({ x: index, y: item.value })),
        xField: 'x',
        yField: 'y',
    };

    const funnelConfig = {
        data: [
            { stage: 'Visit', value: 5000 },
            { stage: 'Register', value: 4000 },
            { stage: 'Apply', value: 3000 },
            { stage: 'In Review', value: 2000 },
            { stage: 'Complete', value: 1000 },
        ],
        xField: 'stage',
        yField: 'value',
    };

    const gaugeConfig = {
        width: 480,
        height: 480,
        autoFit: true,
        data: {
          target: 159,
          total: 400,
          name: 'score',
          thresholds: [100, 200, 400],
        },
        legend: false,
        scale: {
          color: {
            range: ['#F4664A', '#FAAD14', 'green'],
          },
        },
        style: {
            width: '100%',
            height: '200px',
        },
    };

    return (
        <div>
            <h1>Ant Design Charts Examples</h1>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Line Chart" style={{ marginBottom: 16 }}>
                        <Line {...lineConfig} />
                        <Button onClick={() => toggleDataVisibility('line')}>
                            {showData.line ? 'Hide Data' : 'Show Data'}
                        </Button>
                        {showData.line && <pre>{JSON.stringify(data, null, 2)}</pre>}
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Bar Chart" style={{ marginBottom: 16 }}>
                        <Bar {...barConfig} />
                        <Button onClick={() => toggleDataVisibility('bar')}>
                            {showData.bar ? 'Hide Data' : 'Show Data'}
                        </Button>
                        {showData.bar && <pre>{JSON.stringify(data, null, 2)}</pre>}
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Pie Chart" style={{ marginBottom: 16 }}>
                        <Pie {...pieConfig} />
                        <Button onClick={() => toggleDataVisibility('pie')}>
                            {showData.pie ? 'Hide Data' : 'Show Data'}
                        </Button>
                        {showData.pie && <pre>{JSON.stringify(data, null, 2)}</pre>}
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Area Chart" style={{ marginBottom: 16 }}>
                        <Area {...areaConfig} />
                        <Button onClick={() => toggleDataVisibility('area')}>
                            {showData.area ? 'Hide Data' : 'Show Data'}
                        </Button>
                        {showData.area && <pre>{JSON.stringify(data, null, 2)}</pre>}
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Column Chart" style={{ marginBottom: 16 }}>
                        <Column {...columnConfig} />
                        <Button onClick={() => toggleDataVisibility('column')}>
                            {showData.column ? 'Hide Data' : 'Show Data'}
                        </Button>
                        {showData.column && <pre>{JSON.stringify(data, null, 2)}</pre>}
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Radar Chart" style={{ marginBottom: 16 }}>
                        <Radar {...radarConfig} />
                        <Button onClick={() => toggleDataVisibility('radar')}>
                            {showData.radar ? 'Hide Data' : 'Show Data'}
                        </Button>
                        {showData.radar && <pre>{JSON.stringify(data, null, 2)}</pre>}
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Scatter Chart" style={{ marginBottom: 16 }}>
                        <Scatter {...scatterConfig} />
                        <Button onClick={() => toggleDataVisibility('scatter')}>
                            {showData.scatter ? 'Hide Data' : 'Show Data'}
                        </Button>
                        {showData.scatter && <pre>{JSON.stringify(scatterConfig.data, null, 2)}</pre>}
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Funnel Chart" style={{ marginBottom: 16 }}>
                        <Funnel {...funnelConfig} />
                        <Button onClick={() => toggleDataVisibility('funnel')}>
                            {showData.funnel ? 'Hide Data' : 'Show Data'}
                        </Button>
                        {showData.funnel && <pre>{JSON.stringify(funnelConfig.data, null, 2)}</pre>}
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Card title="Gauge Chart" style={{ marginBottom: 16 }}>
                        <Gauge {...gaugeConfig} />
                        <Button onClick={() => toggleDataVisibility('gauge')}>
                            {showData.gauge ? 'Hide Data' : 'Show Data'}
                        </Button>
                        {showData.gauge && <pre>{JSON.stringify(gaugeConfig.data, null, 2)}</pre>}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ChartsPage;
