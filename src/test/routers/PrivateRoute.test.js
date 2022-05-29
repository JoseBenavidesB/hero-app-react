import { mount } from "enzyme/build"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../auth/authContext"
import { PrivateRoute } from "../../routers/PrivateRoute"

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    Navigate: () => <span>Exit</span>
}));

describe('test in PrivateRoute', () => {

    Storage.prototype.serItem = jest.fn();

    test('should show component if authenticated and save localstorage', () => {

        const contextValue = {
            user: {
                logged: true,
                name: 'jose'
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper.text().trim()).toBe('Private component')
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath','/');
    });

    test('should show component if authenticated and save localstorage', () => {

        const contextValue = {
            user: {
                logged: false,
            }
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect( wrapper.text().trim()).toBe('Exit')
        
    });


});