// MyBarChart.js
import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalBarSeries,
    LabelSeries
} from 'react-vis';

class BarChart extends React.Component {
    render() {
        const data = this.props.data;
        const size = this.props.chartWidth;
        const chartWidth = 200;
        const chartHeight = 200;
        const chartDomain = [0, 100];
        return (
            <XYPlot
                xType="ordinal"
                width={chartWidth}
                height={chartHeight}
                yDomain={chartDomain}
            >
                <XAxis />
                <YAxis />
                <VerticalBarSeries
                    data={data}
                />
                <LabelSeries
                    data={data.map(obj => {
                        return { ...obj, label: obj.y.toString() }
                    })}
                    labelAnchorX="middle"
                    labelAnchorY="text-after-edge"
                />
            </XYPlot>
        );
    }
}

export default BarChart
