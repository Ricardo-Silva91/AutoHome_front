import React, {Component} from 'react';
import '../App.css';
import ReactTable from 'react-table';

//import GeneralMethods from '../scripts/general_methods'
import {getMyInfo} from '../scripts/general_methods';
import {setPinState} from '../scripts/general_methods';

class PinTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pins: []
        };
    }

    getPins() {
        getMyInfo((response) => {
            if (response !== false) {
                this.setState({pins: response.pins});
            }
        })
    }

    switchPin(pinNumber) {

        let nextPinState = 'HIGH';

        for (let i in this.state.pins) {
            if (this.state.pins[i].number === pinNumber) {
                nextPinState = this.state.pins[i].currentState === 'HIGH' ? 'LOW' : 'HIGH';
                break;
            }
        }

        setPinState(pinNumber, nextPinState, (response) => {
            console.log('response: ' + response);
            if (response !== false) {
                this.getPins();
            }
        })
    }

    componentDidMount() {
        this.getPins();
    }

    render() {

        let data = [];

        for (let i in this.state.pins) {
            data.push({
                number: this.state.pins[i].number,
                op: this.state.pins[i].op,
                desc: this.state.pins[i].desc,
                currentState: this.state.pins[i].currentState === 'HIGH' ? 'OFF' : 'ON',
                currentValue: this.state.pins[i].currentValue,
                realName: this.state.pins[i].realName
            })
        }

        const columns = [
            {Header: 'Number', accessor: 'number'},
            {Header: 'OP', accessor: 'op'},
            {Header: 'Desc', accessor: 'desc'},
            {Header: 'CurrentState', accessor: 'currentState'},
            {Header: 'CurrentValue', accessor: 'currentValue'},
            {Header: 'RealName', accessor: 'realName'}
        ];

        return (
            <div>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize="5"
                    filterable={true}
                    defaultFilterMethod={(filter, row, column) => {
                        const id = filter.pivotId || filter.id;
                        return row[id] !== undefined ? String(row[id]).toLowerCase().indexOf(filter.value.toLowerCase()) !== -1 : true
                    }}
                    getTdProps={(state, rowInfo, column, instance) => {
                        return {
                            onClick: e => {
                                if (rowInfo !== undefined) {
                                    console.log('switching pin: ', rowInfo.row.number);
                                    this.switchPin(rowInfo.row.number);
                                }
                                else {
                                    console.log('no video in that row!');
                                }
                            }
                        }
                    }}
                />
            </div>
        );
    }
}

export default PinTable;
