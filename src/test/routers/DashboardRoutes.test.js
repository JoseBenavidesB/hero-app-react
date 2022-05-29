const { mount } = require("enzyme");
import { MemoryRouter } from 'react-router-dom'; //
import { AuthContext } from '../../auth/authContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';


describe('Test DashboardRoutes', () => {

    const contextValue = {
        user: {
            logged: true,
            name: 'jose'
        }
    };


    test('should return correctly - Marvel', () => {
        
        const wrapper = mount( 
        <AuthContext.Provider value={ contextValue } >
            <MemoryRouter initialEntries={ ['/'] }>
                <DashboardRoutes /> 
            </MemoryRouter>
        </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find( '.text-info').text().trim()).toBe('jose')
        expect( wrapper.find('h1').text().trim() ).toBe('Marvel Screen')
    });

    test('should return correctly - DC', () => {
        
        const wrapper = mount( 
        <AuthContext.Provider value={ contextValue } >
            <MemoryRouter initialEntries={ ['/dc'] }>
                <DashboardRoutes /> 
            </MemoryRouter>
        </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe('DC Screen')
    });
});