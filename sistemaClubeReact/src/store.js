import {configureStore, createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        usuarioLogado: localStorage.getItem('usuarioLogado') || null,
        token: localStorage.getItem('token') || null,},
    reducers: {
        login: (state, action) => {
            state.usuarioLogado = action.payload.usuario;
            state.token = action.payload.token;
            localStorage.setItem('usuarioLogado', JSON.stringify(state.usuarioLogado));
            localStorage.setItem('token', state.token);
        },
        logout: (state) => {
            state.usuarioLogado = null
            state.token = null
            localStorage.removeItem('usuarioLogado')
            localStorage.removeItem('token');
        },
    }
})

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export const {login, logout} = authSlice.actions;
export default store;