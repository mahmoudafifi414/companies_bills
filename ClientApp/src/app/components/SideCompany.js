import React, {Component} from "react"
import '../../assets/css/admin_css.css'
import {connect} from 'react-redux'
import {increaseCounter, saveCompanyWithBills, setAmount, setFee} from "../actions/CompanyActions"

class SideCompany extends Component {
    constructor() {
        super();
        this.state = {
            amount: 0,
            counter: 0,
            feeInNumbers: 0,
            disableFee: true,
            disableAddBillAndSubmit: true,
            companyName: '',
            companyNumber: '',
            companyAddress: '',
            inputFilled: 0,
            inputNames: []
        }
    }

    setCompanyName = (e) => {
        e.preventDefault();
        const companyName = e.target.value;
        this.enableDisabledSubmitAddBill('companyName', companyName, companyName.length > 0 ? 1 : 0);
        this.setState({
            companyName: companyName
        });
    };
    setCompanyNumber = (e) => {
        e.preventDefault();
        const companyNum = e.target.value;
        this.enableDisabledSubmitAddBill('companyNumber', companyNum, companyNum.length > 0 ? 1 : 0);
        this.setState({
            companyNumber: companyNum
        });
    };
    setCompanyAddress = (e) => {
        e.preventDefault();
        const companyAddress = e.target.value;
        this.enableDisabledSubmitAddBill('companyAddress', companyAddress, companyAddress.length > 0 ? 1 : 0);
        this.setState({
            companyAddress: companyAddress
        });
    };
    setAmount = (e) => {
        e.preventDefault();
        const amount = e.target.value;
        this.enableDisabledSubmitAddBill('amount', amount.length > 0 ? 1 : 0);
        if (amount <= 0 || amount == '') {
            this.state.disableFee = true;
        } else {
            this.state.disableFee = false;
        }
        this.setState({
            amount: amount
        });
        this.props.setAmount(amount);
    };
    enableDisabledSubmitAddBill = (inputName, inputValue, inputNum) => {
        if (this.state.inputNames.length < 4 && !this.state.inputNames.includes(inputName)) {
            this.state.inputNames.push(inputName);
            this.setState({inputFilled: this.state.inputFilled + inputNum});
        }
        if (inputValue != '' && this.state.inputNames.length >= 4) {
            this.state.disableAddBillAndSubmit = false;
        } else {
            this.state.disableAddBillAndSubmit = true;
        }
    };
    calculateFeeBasedOnAmount = (e) => {
        e.preventDefault();
        if (e.target.value > 100 || e.target.value < 0) {
            alert('fee should be between 0 and 100');
            e.target.value = 0;
        }
        const feeInNumbers = (this.state.amount * e.target.value) / 100;
        const maxAmount = parseInt(feeInNumbers) + parseInt(this.state.amount);
        this.setState({feeInNumbers: feeInNumbers});
        this.props.setAmount(maxAmount);
    };
    increaseCounter = (e) => {
        e.preventDefault();
        const newCounter = this.state.counter + 1;
        this.setState({counter: newCounter});
        this.props.increaseCounter(newCounter);
    };
    submitForm = (e) => {
        e.preventDefault();
        const {bills} = this.props.CompanyReducer;
        const sumAmountOfBills = bills.reduce((total, obj) => {
            return total + obj['amountPercent']
        }, 0);
        if (sumAmountOfBills > 100) {
            alert('Can not save because bills amount is greater than max amount');
            return
        }
        const formData = {
            companyName: this.state.companyName,
            companyNumber: this.state.companyNumber,
            companyAddress: this.state.companyAddress,
            amount: this.props.CompanyReducer.maxAmount,
            bills: this.props.CompanyReducer.bills,
            companyFee: this.state.feeInNumbers
        };
        this.props.saveCompanyWithBills(formData);
        alert('Added Successfully');
    };

    render() {
        return (
            <div className="col-md-2 sidebar" style={{marginLeft: '20px'}}>
                <div className="row">
                    <div className="absolute-wrapper"></div>
                    <div className="side-menu">
                        <nav className="navbar navbar-default" role="navigation">
                            <div className="side-menu-container">
                                <ul className="nav navbar-nav">
                                    <li className="panel panel-default" id="dropdown">
                                        <label>Company name</label>
                                        <input type="text" onChange={this.setCompanyName} className="form-control"
                                               name="company_name"/>
                                    </li>
                                    <li className="panel panel-default" id="dropdown">
                                        <label>Company number</label>
                                        <input type="number" onChange={this.setCompanyNumber} className="form-control"
                                               name="company_number"/>
                                    </li>
                                    <li className="panel panel-default" id="dropdown">
                                        <label>Company address</label>
                                        <input type="text" onChange={this.setCompanyAddress} className="form-control"
                                               name="comapny_address"/>
                                    </li>
                                    <li className="panel panel-default" id="dropdown">
                                        <label>Amount</label>
                                        <input type="text" value={this.state.amount} className="form-control"
                                               name="amount"
                                               onChange={this.setAmount}/>
                                    </li>
                                    <li className="panel panel-default" id="dropdown">

                                        <div className="form-group">
                                            <div className="col-sm-1">
                                                <label>fee</label>
                                            </div>
                                            <div className="col-sm-4">
                                                <input type="text" className="form-control" name="fee"
                                                       disabled={this.state.disableFee == true ? 'disabled' : ''}
                                                       onChange={this.calculateFeeBasedOnAmount}/>
                                            </div>
                                            <div className="col-sm-4">
                                                <input type="text" className="form-control" name="feeNumber"
                                                       disabled="disabled" value={this.state.feeInNumbers}/>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="panel panel-default" id="dropdown">
                                        <div className="form-group">
                                            <button
                                                disabled={this.state.disableAddBillAndSubmit == true ? 'disabled' : ''}
                                                onClick={this.increaseCounter} className="btn btn-primary">Add Bill
                                            </button>
                                        </div>
                                    </li>
                                    <li className="panel panel-default" id="dropdown">
                                        <div className="form-group">
                                            <button onClick={this.submitForm}
                                                    disabled={this.state.disableAddBillAndSubmit == true ? 'disabled' : ''}
                                                    className="btn btn-primary">Save
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    CompanyReducer: state.CompanyReducer,
});

export default connect(
    mapStateToProps,
    {setFee, increaseCounter, setAmount, saveCompanyWithBills}
)(SideCompany);