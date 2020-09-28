import React, {Component} from "react";
import {Dropdown} from "react-bootstrap";
import BatchApi from "../../../../api/BatchApi";

export default class BatchSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            batches: []
        };
    }

    componentDidMount() {
        BatchApi.getList(1, (data) => {
            console.log(data);

            this.setState({
                batches: data['batches']
            });
        }, () => {

        });
    }

    render() {
        const activeBatchPos = this.state.batches.findIndex(x => x.id === this.props.activeBatch);
        return (
            <Dropdown>
                <Dropdown.Toggle
                    variant="outline-primary"
                    id="dropdown-basic"
                    className={'w-100'}
                >
                    {
                        (activeBatchPos !== -1)
                        ? "Batch: " + this.state.batches[activeBatchPos]['delivery_date']
                        : "Ładowanie"
                    }
                </Dropdown.Toggle>

                <Dropdown.Menu
                    className={'w-100 text-center'}
                >
                    {this.state.batches.map(batch => {
                        return (
                            <Dropdown.Item
                                key={batch['id']}
                                onClick={() => {this.props.setActiveBatch(batch['id'])}}>
                                {batch['delivery_date']}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}