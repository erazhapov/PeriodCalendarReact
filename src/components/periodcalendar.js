import React, {Component} from 'react'
import './periodcalendar.scss'

var displayYear, locale;
var months = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var periods =  [];



export default class PeriodCalendar extends Component {
    constructor(props) {
        super(props);
        locale = this.props.locale;
        periods = this.props.periods;
        displayYear = periods.length > 0 ? periods[0].start.getFullYear() : new Date().getFullYear();

        this.state = {
            selectedPeriod: 0,
            hoverPeriod: 0
        }
    }

    changeSelectedPeriod(selectedPeriod) {
        this.setState({selectedPeriod});
        this.props.onChange(periods[selectedPeriod-1]);
    }

    highlightHoverPeriod(hoverPeriod, highlight = true) {
        this.setState({hoverPeriod: highlight ? hoverPeriod : 0});
    }


    render() {
        return <div className='period-calendar'>
            {months.map(function (month, key) {
                return <div className="month" key={key}>
                    <p>{new Date(displayYear, month, 1).toLocaleString(locale, { month: 'long' })}</p>
                    <div className="days">
                        {
                            [...Array(startMonthOffset(month, displayYear))].map(function (day, key) {
                                return <div className="day day-empty" key={key}></div>
                            })
                        }
                    {
                        daysInMonthArray(month, displayYear).map(function (day, key) {
                            var dayInPeriod = dayInPeriods(day, month, displayYear);
                            return <div
                                className={'day' +
                                ((dayInPeriod > 0) ? ' day-period-' + dayInPeriod : '') +
                                ((this.state.selectedPeriod == dayInPeriod) ? ' day-period-active' : '') +
                                ((this.state.hoverPeriod == dayInPeriod && this.state.selectedPeriod != dayInPeriod)
                                    ? ' day-period-hover' : '')}
                                key={key} onClick={() => this.changeSelectedPeriod(dayInPeriod)}
                                onMouseEnter={() => this.highlightHoverPeriod(dayInPeriod)}
                                onMouseLeave={() => this.highlightHoverPeriod(dayInPeriod, false)}>
                                {day}
                            </div>
                        }, this)}
                    </div>
                </div>
            }, this)}
        </div>
    }
}

PeriodCalendar.propTypes = {
    periods: React.PropTypes.any.isRequired,
    onChange: React.PropTypes.func,
    locale: React.PropTypes.string
};

PeriodCalendar.defaultProps = {
    locale: 'en-us'
};


function startMonthOffset(month, year) {
    var date = new Date(year, month, 0);
    var days = date.getDay();
    return  days < 7 ? days  : 0;
}

function daysInMonthArray(month, year) {
    var days = new Date(year, month+1, 0).getDate();
    var array = [];
    for (var i = 0; i < days; i++) {
        array[i] = i + 1;
    }
    return array;
}

function dayInPeriods(day, month, year) {
    var thisDay = new Date(year, month, day);
    for (var period in periods) {
        if (periods[period].start <= thisDay && thisDay <= periods[period].end) {
            return +period + 1;
        }
    }
    return 0;
}