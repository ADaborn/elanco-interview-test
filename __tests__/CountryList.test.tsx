import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CountryList from '../src/app/components/CountryList'

describe('CountryList', () => {
    it('should render without crashing', () => {
        render(
            <CountryList />
        );
    })

    it('should render skeletons when loading', () => {
        render(
            <CountryList isLoading={true} />
        );
        const skeletons: HTMLElement[] = screen.getAllByTestId("skeleton");
        expect(skeletons?.length).toBeGreaterThan(1);
    })

    it('should not render skeletons when not loading', () => {
        render(
            <CountryList isLoading={false} />
        );
        const countryList: HTMLElement = screen.getByTestId("countrylist");
        expect(countryList).toBeEmptyDOMElement();

        const skeletons: HTMLElement[] = screen.queryAllByTestId("skeleton");
        expect(skeletons?.length).toEqual(0);
    })

    it('should render a single country', () => {
        const {getByTestId, getAllByText, getAllByTestId} =  render(
            <CountryList countries={[{
                flag: "https://url.com/flag.svg",
                name: "Brazil",
                timezone: "UTC-5",
                region: "South America",
                code: "BR"
            }]} />
        );

        const countryList: HTMLElement[] = getAllByTestId("country");
        expect(countryList?.length).toEqual(1);

        const anchor: HTMLElement = getByTestId("anchor");
        expect(anchor.getAttribute("href")).toEqual("/country/BR");

        expect(getAllByText("Brazil")).toBeTruthy();
        expect(getAllByText("South America")).toBeTruthy();
        
        const image: HTMLElement = getByTestId("flagimage");
        expect(image.getAttribute("src")).toEqual("https://url.com/flag.svg")        

    })

})