
import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types";



describe('Test authReducer', () => {

    test('should return default state', () => { 
        const state = authReducer( {logged: false }, {})

        expect( state ).toEqual( {logged: false } )
     });

    test('should return logged: true', () => {
        
        const action = {
            type: types.login,
            payload: {
                name: 'Jose'
            }
        }
        const state = authReducer( {logged: false }, action)

        expect( state ).toEqual( {name: 'Jose', logged: true } )
     });

     test('should return logged: false', () => {
        
        const action = {
            type: types.logout,
        }
        const state = authReducer( {logged: true, name: 'Jose' }, action)

        expect( state ).toEqual( {logged: false } )
     });


})