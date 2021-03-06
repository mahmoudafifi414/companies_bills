import axios from 'axios';
import {
    DECREASE_BILLS,
    DELETE_BILL_FROM_COMPANY,
    GET_BILL_DATA,
    GET_BILLS_OF_COMPNIES,
    INCREASE_BILLS,
    SET_AMOUNT,
    SET_COMPANY_FEE,
    UPDATE_BILL_DATA,
    UPDATE_BILLS,
    ADD_COMPANY_BILLS
} from './types';

export const setFee = (fee) => dispatch => {
    dispatch({
        type: SET_COMPANY_FEE,
        payload: fee
    })
};
//action of increase counter of bills
export const increaseCounter = (counter) => dispatch => {
    dispatch({
        type: INCREASE_BILLS,
        payload: counter
    })
}
//function of reduce counter to delete bill
export const reduceCounter = (billId) => dispatch => {
    dispatch({
        type: DECREASE_BILLS,
        payload: billId
    })
};
//function to set new amount in add company view
export const setAmount = (maxAmount) => dispatch => {
    dispatch({
        type: SET_AMOUNT,
        payload: maxAmount
    })
};
//action of update bills
export const updateBills = (bills) => dispatch => {
    dispatch({
        type: UPDATE_BILLS,
        payload: bills
    })
};
//function to save comapny and its bills
export const saveCompanyWithBills = (formData) => dispatch => {
    axios.post('http://127.0.0.1:8000/api/companies', formData).then(res =>
        dispatch({
            type: ADD_COMPANY_BILLS,
            payload: res.data.users
        })
    )
};
//function to get bills of all companies
export const getBillsOfCompanies = (numberPerPage) => dispatch => {
    axios.get('http://127.0.0.1:8000/api/bills' + (numberPerPage != null ? '/' + numberPerPage : '')).then(res =>
        dispatch({
            type: GET_BILLS_OF_COMPNIES,
            payload: res.data.bills
        })
    );
};
//function of get new data with pagination
export const updatePaginationData = (apiLink, paginationNumber) => dispatch => {
    axios.get(apiLink + '?page=' + paginationNumber).then(res =>
        dispatch({
            type: GET_BILLS_OF_COMPNIES,
            payload: res.data.bills
        })
    );
};
//function of filter bills
export const filterBillsOfCompanies = (filterData) => dispatch => {
    axios.post('http://127.0.0.1:8000/api/bills/filter', filterData).then(res =>
        dispatch({
            type: GET_BILLS_OF_COMPNIES,
            payload: res.data.bills
        })
    );
};
//function of delete bill
export const deleteBill = (billId) => dispatch => {
    axios.delete('http://127.0.0.1:8000/api/bills/' + billId).then(res =>
        dispatch({
            type: DELETE_BILL_FROM_COMPANY,
            payload: res.data.id
        })
    );
};
//function of get bill data to edit it
export const getBillData = (billId) => dispatch => {
    axios.get('http://127.0.0.1:8000/api/bill/' + billId).then(res =>
        dispatch({
            type: GET_BILL_DATA,
            payload: res.data
        })
    );
};
//function to update bill data
export const updateBillData = (billId, billData) => dispatch => {
    axios.patch('http://127.0.0.1:8000/api/bill/' + billId, billData).then(res =>
        dispatch({
            type: UPDATE_BILL_DATA,
            payload: res.data
        })
    );
};

