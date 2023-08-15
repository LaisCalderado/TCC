export const TOKEN_KEY="token";

export var autenticado = () => {
    if(localStorage.getItem(TOKEN_KEY)){
        return true
    }else{
        return false
    }
};

export const getToken = () =>{
    return localStorage.getItem(TOKEN_KEY);
};

export const login = (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('user_nome', user.username);
};

export const logout = () => { 
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('user_id' );
    localStorage.removeItem('user_nome' );
};