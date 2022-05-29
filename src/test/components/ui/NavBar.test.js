import { mount } from "enzyme/build";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { NavBar } from "../../../components/ui/NavBar";
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('test NavBar', () => {
    const contextValue = {
        user: {
            name: 'jose',
        },
        dispatch: jest.fn()
    };

    const wrapper = mount( 
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<NavBar />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider> )

    test('should show correctly', () => {

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('jose')
    });

    test('should call logout, call navigate and dispatch with arguments', () => {

        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch ).toBeCalledWith({ 'type': types.logout });

        expect( mockNavigate ).toHaveBeenCalledWith('/login', {replace:true});
    })
})