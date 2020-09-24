import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {connect} from 'react-redux';

class highChart extends Component {
    render() {
		const options = {
			title: {
				text: '都道府県別の総人口推移グラフ'
			},
			plotOptions: {
				series: {
					label: {
						connectorAllowed: false
					},
					pointInterval: 5,
					pointStart: 1960
				}
			},
			series: this.props.checkevents
		};
        return <HighchartsReact highcharts={Highcharts} options={options} />
    }
}

const mapStateToProps = state => ({ checkevents: state.checkevents })

export default connect(mapStateToProps)(highChart);