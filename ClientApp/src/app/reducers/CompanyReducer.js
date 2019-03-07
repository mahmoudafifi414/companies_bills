import update from 'react-addons-update';
import {
    ADD_COMPANY_BILLS,
    DECREASE_BILLS,
    DELETE_BILL_FROM_COMPANY,
    GET_BILL_DATA,
    GET_BILLS_OF_COMPNIES,
    INCREASE_BILLS,
    SET_AMOUNT,
    SET_COMPANY_FEE,
    UPDATE_BILLS,
    UPDATE_BILL_DATA
} from '../actions/types';

const initialState = {
    companies: '',
    fees: 0,
    billsCounter: 0,
    bills: [],
    billsOfTheCompanies: [],
    maxAmount: 0,
    deleteMessage: '',
    currentBillData: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_COMPANY_BILLS:
            return {
                ...state,
                companies: action.payload.message,
            };
        case SET_COMPANY_FEE:
            return {
                ...state,
                fees: action.payload
            };
        case INCREASE_BILLS:
            return {
                ...state,
                billsCounter: action.payload,
                bills: [{id: action.payload, dateOfBill: '', billNo: 0, amount: 0, amountPercent: 0}, ...state.bills]
            };
        case DECREASE_BILLS:
            return {
                ...state,
                billsCounter: state.billsCounter - 1,
                bills: state.bills.filter(bill => bill.id != action.payload)
            };
        case SET_AMOUNT:
            return {
                ...state,
                maxAmount: action.payload
            };
        case UPDATE_BILLS:
            return {
                ...state,
                bills: action.payload
            };
        case GET_BILLS_OF_COMPNIES:
            return {
                ...state,
                billsOfTheCompanies: action.payload
            };
        case GET_BILL_DATA:
            return {
                ...state,
                currentBillData: action.payload
            };
        case UPDATE_BILL_DATA:
            return {
                ...state,
                currentBillData: action.payload
            };
        case DELETE_BILL_FROM_COMPANY:
            return update(state, {
                billsOfTheCompanies: {
                    data: {$set: state.billsOfTheCompanies.data.filter(bill => bill.id != action.payload)}
                }
            });
        default:
            return state;
    }
}