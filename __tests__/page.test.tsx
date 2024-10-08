import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page, { AllCountriesQuery } from '../src/app/page'
import { MockedProvider } from '@apollo/react-testing'

const mocks = [
    {
        request: {
            query: AllCountriesQuery,
            variables: {
                name: '', capital: '', region: '', timezone: ''
            },
        },
        result: {
            data: {
                countries: [{
                    code: "",
                    flag: "",
                    name: "",
                    timezone: "",
                    region: "",
                }],
                regions: [],
                timezones: []
            },
        },
    }];


describe('Page', () => {
    it('should render without crashing', () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Page />
            </MockedProvider>);

        const heading = screen.getByRole('heading', { level: 1 })

        expect(heading).toBeInTheDocument()
    })
})