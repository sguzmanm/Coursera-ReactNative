import * as ActionTypes from './ActionTypes';

import {baseUrl} from '../shared/baseUrl';

export const fetchComments=()=>(dispatch)=>{
    return fetch(baseUrl+'comments').then(
        response=>{
            if(response.ok)
                return response;
            else
            {
                var error=new Error('Error '+response.status+' '+response.statusText);
                error.response=response;
                throw error;    
            }
        }
    ,error=>{
        var error=new Error(error.message);
        throw error;
    }).then(response=>response.json())
        .then(comments=>dispatch(addComments(comments)))
    .catch(error=>dispatch(commentsFailed(error.message)))
};

export const commentsFailed=(errMess)=>({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errMess
});

export const addComments=(comments)=>({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
});

export const postComment=(dishId,rating,author,comment)=>(dispatch)=>{
    setTimeout(
        ()=>dispatch(addComment(dishId,rating,author,comment,new Date()))
        ,2000)
}

export const addComment=(dishId,rating,author,comment,date)=>(
    {
        type:ActionTypes.ADD_COMMENT,
        payload:{
            dishId:dishId,
            rating:rating,
            author:author,
            comment:comment,
            date:date.toISOString()
        }
    }
)

export const fetchDishes=()=>(dispatch)=>{
    dispatch(dishesLoading())
    return fetch(baseUrl+'dishes').then(
        response=>{
            if(response.ok)
                return response;
            else
            {
                var error=new Error('Error '+response.status+' '+response.statusText);
                error.response=response;
                throw error;    
            }
        }
    ,error=>{
        var error=new Error(error.message);
        throw error;
    }).then(response=>response.json())
        .then(dishes=>dispatch(addDishes(dishes)))
    .catch(error=>dispatch(dishesFailed(error.message)))
};

export const dishesLoading=()=>({
    type:ActionTypes.DISHES_LOADING
});

export const dishesFailed=(errMess)=>({
    type:ActionTypes.DISHES_FAILED,
    payload:errMess
});

export const addDishes=(dishes)=>({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
});

export const fetchPromos=()=>(dispatch)=>{
    dispatch(promotionsLoading())
    return fetch(baseUrl+'promotions').then(
        response=>{
            if(response.ok)
                return response;
            else
            {
                var error=new Error('Error '+response.status+' '+response.statusText);
                error.response=response;
                throw error;    
            }
        }
    ,error=>{
        var error=new Error(error.message);
        throw error;
    }).then(response=>response.json())
        .then(promotions=>dispatch(addPromotions(promotions)))
    .catch(error=>dispatch(promotionsFailed(error.message)))
};

export const promotionsLoading=()=>({
    type:ActionTypes.PROMOS_LOADING
});

export const promotionsFailed=(errMess)=>({
    type:ActionTypes.PROMOS_FAILED,
    payload:errMess
});

export const addPromotions=(promotions)=>({
    type:ActionTypes.ADD_PROMOS,
    payload:promotions
});

export const fetchLeaders=()=>(dispatch)=>{
    dispatch(leadersLoading())
    return fetch(baseUrl+'leaders').then(
        response=>{
            if(response.ok)
                return response;
            else
            {
                var error=new Error('Error '+response.status+' '+response.statusText);
                error.response=response;
                throw error;    
            }
        }
    ,error=>{
        var error=new Error(error.message);
        throw error;
    }).then(response=>response.json())
        .then(leaders=>dispatch(addLeaders(leaders)))
    .catch(error=>dispatch(leadersFailed(error.message)))
};

export const leadersLoading=()=>({
    type:ActionTypes.LEADERS_LOADING
});

export const leadersFailed=(errMess)=>({
    type:ActionTypes.LEADERS_FAILED,
    payload:errMess
});

export const addLeaders=(leaders)=>({
    type:ActionTypes.ADD_LEADERS,
    payload:leaders
});

export const postFavorite=(dishId)=>(dispatch)=>{
    setTimeout(()=>{
        dispatch(addFavorite(dishId))
    },2000);
}

export const addFavorite=(dishId)=>({
    type:ActionTypes.ADD_FAVORITE,
    payload:dishId
})

export const deleteFavorite=(dishId)=>({
    type:ActionTypes.DELETE_FAVORITE,
    payload:dishId
})