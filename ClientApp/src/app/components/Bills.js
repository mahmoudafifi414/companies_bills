import React, {Component} from "react"
import {connect} from 'react-redux'
import {reduceCounter, updateBills} from "../actions/CompanyActions"

class Bills extends Component {
    constructor() {
        super();
        this.state = {
            bills: []
        }
    }
   //function of add new bills in bills array to save them in further operation
    modifyBill = (e) => {
        e.preventDefault();
        //get input and split it to get id and name of field to be set in object
        const inputId = e.target.id.split('_');
        const {bills} = this.props.CompanyReducer;
        const {maxAmount} = this.props.CompanyReducer;
        bills.map(bill => {
            if (inputId[1] == bill.id) {
                bill[inputId[0]] = e.target.value;
                if (inputId[0] == 'amount') {
                    //make percent calculation to get bill amount compared by all amount
                    bill['amountPercent'] = (e.target.value * 100) / maxAmount;
                }
                return;
            }
        });
        //update bills array in state in reducer
        this.props.updateBills(bills);
    };
   //function of delete bill in add company view
    removeBill = (e) => {
        e.preventDefault();
        this.props.reduceCounter(e.target.id)
    };

    render() {
        const {billsCounter} = this.props.CompanyReducer;
        const {bills} = this.props.CompanyReducer;
        const {maxAmount} = this.props.CompanyReducer;
        return (
            <table>
                <thead>
                {billsCounter > 0 ?
                    <tr>
                        <th scope="col">date of bill</th>
                        <th scope="col">bill number</th>
                        <th scope="col">amount of bill <br/>sum of all is {maxAmount}</th>
                        <th scope="col">bill percent from all amount<br/> sum of all >= 100%</th>
                    </tr>
                    : <tr></tr>}
                </thead>
                <tbody>
                {bills.map((bill) => (
                    <tr key={bill.id}>
                        <td><input type="date" id={"dateOfBill_" + bill.id} onChange={this.modifyBill}
                                   className="form-control"/></td>
                        <td><input type="number" id={"billNo_" + bill.id} onChange={this.modifyBill}
                                   className="form-control"/></td>
                        <td><input type="text" id={"amount_" + bill.id} onChange={this.modifyBill}
                                   className="form-control"/></td>
                        <td><input type="text" id={"amountPercent" + bill.id} onChange={this.modifyBill}
                                   value={bill.amountPercent + " %"} disabled="disabled"
                                   className="form-control"/>
                        </td>
                        <td>
                            <button onClick={this.removeBill} id={bill.id} className="btn btn-danger">delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state => ({
    CompanyReducer: state.CompanyReducer,
});

export default connect(
    mapStateToProps,
    {reduceCounter, updateBills}
)(Bills);