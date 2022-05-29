import { mount } from "enzyme/build";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/hero/HeroScreen";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));


describe('Test in HeroScreen', () => {
   
    test('should return correctly', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']} >
                <Routes>
                    <Route path="/hero" element={ <HeroScreen />} />
                    <Route path="/" element={ <h1>No hero page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper.find('h1').text().trim() ).toBe('No hero page')
    });

    test('should return a hero if params exists', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']} >
                <Routes>
                    <Route path="/hero/:heroId" element={ <HeroScreen />} />
                    <Route path="/" element={ <h1>No hero page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe(true);
    });

    test('should return to previews screen', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']} >
                <Routes>
                    <Route path="/hero/:heroId" element={ <HeroScreen />} />
                    <Route path="/" element={ <h1>No hero page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        
        wrapper.find('button').prop('onClick')();

        expect( mockNavigate ).toHaveBeenCalledWith(-1);
    });

    test('should show No Hero Page', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider16516']} >
                <Routes>
                    <Route path="/hero/:heroId" element={ <HeroScreen />} />
                    <Route path="/" element={ <h1>No hero page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        
        expect( wrapper.text()).toBe('No hero page')
    });
})