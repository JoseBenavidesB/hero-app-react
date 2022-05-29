import { mount } from "enzyme"
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen"

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

describe('Test SearchScreen', () => {

    test('should return correctly ', () => {

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper.find('.alert-info').text().trim() ).toBe('Find a Hero');
    });

    test('should show Batman and input value of queryString', () => {

        const wrapper = mount( 
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toBe('batman');
    });

    test('should show Alert-Danger NOT RESULT', () => {
        const query = '12314sdfasd'
        const wrapper = mount( 
            <MemoryRouter initialEntries={[`/search?q=${ query }`]}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect( wrapper.find('.alert-danger').text().trim() ).toBe( `There is not result: ${query}` );
    });

    test('should call navigate to new URL', () => {
        const query = '12314sdfasd'
        const wrapper = mount( 
            <MemoryRouter initialEntries={[`/search?q=${ query }`]}>
                <SearchScreen />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault: () => {}
        });

        expect( mockNavigate ).toHaveBeenCalledWith('?q=batman');
    });

});