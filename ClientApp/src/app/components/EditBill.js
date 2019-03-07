import React, {Component} from "react"
import {Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import {updateBillData} from '../actions/CompanyActions'

class EditBill extends Component {
    constructor() {
        super();
        this.state = {
            date: '',
            billNumber: '',
            amount: ''
        }
    }
    //function to set date to save it in further edit operation
    setDate = (e) => {
        this.setState({date: e.target.value})
    };
    //function to set bill number to save it in further edit operation
    setBillNumber = (e) => {
        this.setState({billNumber: e.target.value})
    };
    //function to set amount to save it in further edit operation
    setAmount = (e) => {
        this.setState({amount: e.target.value})
    };
    //update opertion of bill
    updateBill = e => {
        e.preventDefault();
        const {currentBillData} = this.props.CompanyReducer;
        const dataToUpdate = {
            date: this.state.date.length > 0 ? this.state.date : null,
            billNumber: this.state.billNumber.length > 0 ? this.state.billNumber : null,
            amount: this.state.amount.length > 0 ? this.state.amount : null
        };
        //call update function in actions
        this.props.updateBillData(currentBillData.data.id, dataToUpdate);
        alert('Updated Successfully');

    };

    render() {
        const {currentBillData} = this.props.CompanyReducer;
        if (typeof currentBillData.data !== 'undefined') {
            return (
                <Modal
                    show={this.props.show}
                    onHide={this.props.hide}
                    dialogClassName="modal-90w"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Edit Bill
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <table>
                            <thead>
                            <tr>
                                <th scope="col">date of bill</th>
                                <th scope="col">bill number</th>
                                <th scope="col">amount of bill <br/></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><input defaultValue={currentBillData.data.date} type="date" onChange={this.setDate}
                                           className="form-control"/></td>
                                <td><input defaultValue={currentBillData.data.billNumber} type="number"
                                           onChange={this.setBillNumber}
                                           className="form-control"/></td>
                                <td><input type="number" defaultValue={currentBillData.data.amount}
                                           onChange={this.setAmount}
                                           className="form-control"/></td>
                                <td>
                                    <button onClick={this.updateBill} className="btn btn-primary">Update</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Modal.Body>
                </Modal>
            )
        } else {
            return <div>Loading...........</div>
        }
    }
}

const mapStateToProps = state => ({
    CompanyReducer: state.CompanyReducer
});

export default connect(
    mapStateToProps,
    {updateBillData}
)(EditBill);