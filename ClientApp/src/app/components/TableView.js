import React, {Component} from "react"
import {connect} from 'react-redux'
import {
    deleteBill,
    filterBillsOfCompanies,
    getBillData,
    getBillsOfCompanies,
    updatePaginationData
} from '../actions/CompanyActions'
import EditBill from "./EditBill";
import {AddCompanies} from "./AddCompanies";

class TableView extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            months: [{'jan': 1}, {'feb': 2}, {'March': 3}, {'April': 4}, {'May': 5}, {'June': 6}, {'July': 7}, {'Aug': 8}, {'Sept': 9}, {'Oct': 10}, {'Nov': 11}, {'Dec': 12}],
            years: ['2019', '2018', '2017', '2016', '2015', '2014', '2013'],
            month: '',
            year: '',
            showAdd: false,
            showEdit: false
        };
    }


    componentDidMount() {
        this.getBillsOfCompanies()
    }

    handleShowEdit = (e) => {
        e.preventDefault();
        this.props.getBillData(e.target.id);
        setTimeout(() => {
            this.setState({showEdit: true});
        }, 500)

    };

    handleHideEdit = () => {
        this.setState({showEdit: false});
        this.getBillsOfCompanies();
    };
    handleShowAdd = (e) => {
        e.preventDefault();
        this.setState({showAdd: true});
    };

    handleHideAdd = () => {
        this.setState({showAdd: false});
        this.getBillsOfCompanies();
    };
    getBillsOfCompanies = (e) => {
        this.props.getBillsOfCompanies(typeof e !== 'undefined' ? e.target.value : null);
    };
    filterBillsOfCompanies = (e) => {
        e.preventDefault();
        if (e.target.id == 'year') {
            this.setState({year: e.target.value});
        } else if (e.target.id == 'month') {
            this.setState({month: e.target.value});
        }
        let that = this;
        setTimeout(function () {
            const filterData = {
                year: that.state.year,
                month: that.state.month
            };
            that.props.filterBillsOfCompanies(filterData)
        }, 1);

    };
    filterBillsOfCompaniesInSearch = (e) => {
        e.preventDefault();
        const filterData = {
            searchText: e.target.value
        };
        this.props.filterBillsOfCompanies(filterData)
    };
    updatePaginationData = e => {
        e.preventDefault();
        const urlLinkForApi = this.props.CompanyReducer.billsOfTheCompanies.first_page_url.split("?");
        this.props.updatePaginationData(urlLinkForApi[0], e.target.text)
    };
    deleteBill = (e) => {
        e.preventDefault();
        const billId = e.target.id;
        this.props.deleteBill(billId)
    };

    render() {
        const {billsOfTheCompanies} = this.props.CompanyReducer;
        if (typeof billsOfTheCompanies.data !== 'undefined') {
            return (
                <div>
                    <div className="form-group col-sm-2">
                        <button onClick={this.handleShowAdd} className="btn btn-primary">Add company</button>
                    </div>
                    <div className="col-sm-6" style={{float: 'right'}}>
                        <div className="form-group col-sm-2">
                            <select id="month" className="form-control" onChange={this.filterBillsOfCompanies}>
                                <option value=''>month</option>
                                {this.state.months.map((month) => (
                                    <option key={month[Object.keys(month)[0]]}
                                            value={month[Object.keys(month)[0]]}>{Object.keys(month)[0]}</option>
                                ))}
                            </select>

                        </div>
                        <div className="form-group col-sm-2">
                            <select id="year" className="form-control" onChange={this.filterBillsOfCompanies}>
                                <option value=''>year</option>
                                {this.state.years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-sm-2">
                            <button className="btn btn-primary" onClick={this.getBillsOfCompanies}>All</button>
                        </div>
                        <div className="form-group col-sm-2">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search"
                                   onChange={this.filterBillsOfCompaniesInSearch}/>
                        </div>
                        <div className="form-group col-sm-2">
                            <select onChange={this.getBillsOfCompanies} className="form-control">
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={40}>40</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Action</th>
                            <th scope="col">Date of payment</th>
                            <th scope="col">company ,company number</th>
                            <th scope="col">quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {billsOfTheCompanies.data.map((bill) => (
                            bill.companies != null ?
                                <tr key={bill.id}>
                                    <td>
                                        <button onClick={this.handleShowEdit} id={bill.id} className="btn btn-info">edit
                                        </button>
                                        <button type="button" className="btn btn-danger" id={bill.id}
                                                onClick={this.deleteBill}>remove
                                        </button>
                                    </td>
                                    <td>{bill.date}</td>
                                    <td><b>{bill.companies.name}</b><br/> {bill.companies.referenceNr}</td>
                                    <td>{bill.amount}</td>

                                </tr> : ''
                        ))}
                        </tbody>
                    </table>
                    <ul className="pagination">
                        {[...Array(billsOfTheCompanies.last_page).keys()].map((i) => (
                            billsOfTheCompanies.current_page == i + 1 ?
                                <li className="active" key={i + 1}><a
                                    onClick={this.updatePaginationData} href='#'>{i + 1}</a></li> :
                                <li key={i + 1}><a onClick={this.updatePaginationData} href="#">{i + 1}</a></li>
                        ))}
                    </ul>
                    <EditBill show={this.state.showEdit} hide={this.handleHideEdit}
                              billData={this.props.CompanyReducer.currentBillData}/>
                    <AddCompanies show={this.state.showAdd} hide={this.handleHideAdd}/>
                </div>

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
    {getBillsOfCompanies, getBillData, updatePaginationData, filterBillsOfCompanies, deleteBill}
)(TableView);