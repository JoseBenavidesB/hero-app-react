import { mount } from "enzyme/build";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from "../../../components/login/LoginScreen";

import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));


describe('test LoginScreen', () => {
    const contextValue = {
        user: {
            name: 'jose',
        },
        dispatch: jest.fn()
    };

    const wrapper = mount(
                            <AuthContext.Provider value={contextValue}>
                                <MemoryRouter initialEntries={['/login']}>
                                    <Routes>
                                        <Route path="/login" element={ <LoginScreen />} />
                                    </Routes>
                                </MemoryRouter>
                            </AuthContext.Provider>);

    test('should show correctly', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('should do dispatch and navigation', () => {
        
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: { name: "Jose"}
        });

        expect( mockNavigate ).toHaveBeenCalledWith('/', { replace: true});

        localStorage.setItem('lastPath', '/dc');
        handleClick();

        expect( mockNavigate ).toHaveBeenCalledWith('/dc', { replace: true});
    })
})