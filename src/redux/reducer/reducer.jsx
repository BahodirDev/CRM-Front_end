import React from 'react';

const initialState={
    employees:[],
    products:[],
    orders:[],
    reports:[],
    searching:[],
    category:[],
    loading:'Loading',
    user:'',
    login:false
}
function reducer(state=initialState,{type,payload}) {
    switch (type) {
        case "LOGIN":
            return{
                ...state,
                login:payload
            }
        case "AUTH":
            return{
                ...state,
                user:payload
            }
        case "FETCHING":  
        return{
            ...state,
            loading:'Loading'
        }
        case "EMP_FETCHED":     
        return{
            ...state,
            employees:payload,
            loading:"Pending"
        }
        case "ADD_PRODUCTS":     
        return{
            ...state,
            products:[...state.products,payload],
            loading:"Pending"
        }
        case "REMOVE_FROM_EMP":     
        return{
            ...state,
            employees:state.employees.filter(s=>s._id !== payload._id),
            loading:"Pending"
        }
        case "REMOVE_FROM_PRO":     
        return{
            ...state,
            products:state.products.filter(s=>s._id !== payload._id),
            loading:"Pending"
        }
        case "PRODUCTS_FETCHED":
            return{
                ...state,
                products:payload,
                loading:"Pending"
                
            }
        case "PRODUCTS_FETCHED_BASKET":
            return{
                ...state,
                orders:payload,
                loading:"Pending"
                
            }
        case "EDIT_FETCHED_BASKET":
            return{
                ...state,
                orders:state.orders.map((val,idx)=>{
                    if(val._id == payload._id){
                        return{
                            ...val,
                            amount:payload.amount,
                            msg:payload.msg
                        }
                    }else{
                        return val
                    }
                }),
                loading:"Pending"
                
            }
        case "EDIT_FETCHED_BASKET_PRICE":
            return{
                ...state,
                orders:state.orders.map((val,idx)=>{
                    if(val._id == payload.id){
                        return{
                            ...val,
                           product_id:{...val.product_id,sale_price:payload.price}
                        }
                    }else{
                        return val
                    }
                }),
                loading:"Pending"
                
            }
        case "REMOVE_ORDER":
            return{
                ...state,
                orders:state.orders.filter(s=>s._id !== payload._id)
            }   
        case "CLEAR_ORDER":
            return{
                ...state,
                orders:[]
            }   
        case "REPORT":
            return{
                ...state,
                reports:payload,
                loading:"Pending"
            }   
        case "REPORT_DELETE":
            return{
                ...state,
                reports:state.reports.filter(s=>s._id !== payload._id),
                loading:"Pending"
            }   
        case "FILTER_QUERY":
            return{
                ...state,
                reports:payload,
                loading:"Pending"
            }   
        case "SET_CATEGORY":
            return{
                ...state,
                category:payload,
                loading:"Pending"
            }   
        case "ADD_CATEGORY":
            return{
                ...state,
                category:[...state.category,payload],
                loading:"Pending"
            }   
        case "REMOVE_CATEGORY":
            return{
                ...state,
                category:state.category.filter(s=>s._id !== payload._id),
                loading:"Pending"
            }   
        default:
            return state
    }
}

export default reducer;