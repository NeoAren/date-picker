//
// Redux : 'App' state reducer
//

const headers = { 'Content-Type': 'application/json', 'language': localStorage.getItem('language') };

const initialState = { isLoading: true, lang: {}, os: '', host: '', device: {}, headers: headers, logged_in: null };

export default function reducer(state = initialState, action) {
   switch(action.type) {
      case 'INITIATE_APP':
         return {
            ...state,
            isLoading: false,
            os: action.os,
            lang: action.lang,
            host: action.host,
            device: action.device,
            headers: action.headers
         };
      case 'LOGOUT':
         return {
            ...state,
            logged_in: false
         };
      case 'LOGIN':
         return {
            ...state,
            logged_in: true
         };
      default:
         return state;
   }
}
