import { mount } from "enzyme"
import { AuthContext } from "../../auth/authContext";
import { AppRouter } from "../../routers/AppRouter"


describe('test AppRouter', () => {
    
    test('should show Login if user dont authenticated', () => {
        const contextValue = {
            user: {
                logged: false
            }
        };
        const wrapper = mount( 
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim()).toBe('Login');
        

    });

    test('should show Marvel component if user authenticated', () => {
        
        const contextValue = {
            user: {
                logged: true,
                name: 'Jose'
            }
        };

        const wrapper = mount( 
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.navbar').exists()).toBe(true);
        

    });
})