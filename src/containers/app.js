import React, {Component} from 'react'
import PeriodCalendar from '../components/periodcalendar'

var periods = [{
    start: new Date(2016, 0, 1),
    end: new Date(2016, 2, 23)
},
    {
        start: new Date(2016, 4, 15),
        end: new Date(2016, 7, 12)
    },
    {
        start: new Date(2016, 10, 13),
        end: new Date(2016, 11, 23)
    },
];

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    onPeriodChanged(value){
        console.log(value);
        this.refs.selectedPeriod.textContent = value.start.toLocaleDateString() + ' to ' + value.end.toLocaleDateString();
    }

    render() {
        return <div className="demo">
            <h1>Period Calendar Demo</h1>
            <PeriodCalendar periods={periods} onChange={(e) => this.onPeriodChanged(e)} locale="en-us"/>
            <h2>Selected period:</h2>
            <h3 ref="selectedPeriod">Period not selected</h3>
        </div>
    }
}