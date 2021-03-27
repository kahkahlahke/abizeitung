import React from "react";
import { Chart } from "chart.js";

interface Props {
    labels: Array<string>;

    data: Array<number>
    backgroundColor: Array<string>

}

class PieChart extends React.Component<Props> {
    chartRef: React.RefObject<HTMLCanvasElement>;
    chart: any;


    constructor(props: Props){
        super(props )
        this.chartRef = React.createRef();
    }

    componentDidMount(){
        this.chart = new Chart(this.chartRef.current as HTMLCanvasElement, {
            type: "pie",
            data: {
                labels: this.props.labels,
                datasets: [{
                    data: this.props.data,
                    backgroundColor: this.props.backgroundColor
                }]
            }
        })
    }


    render(){
        return(
            <canvas ref={this.chartRef}></canvas>
        )
    }
}

export default PieChart;