import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {ActionForm} from '../form'

const fakeData = {
    'AAPL': {
        company:{symbol: "AAPL", companyName: "AAPL Inc"},
        quote: {
            symbol: "AAPL", latestPrice: 123,
            change: 1.4, changePercentage: 0.1331,
            company:{companyName: 'Apple'},
            primaryExchange: 'Dow Jones'
        }
    }
}
const fakeSymbol = "AAPL"
test('testing buy and sell action', () => {
    render(<ActionForm
        stockData={fakeData}
        symbol={fakeSymbol}
        submitButton={<button>Submit</button>}
    />)
    // screen.getByRole('le best')
    const input = screen.getByLabelText(/Nb of shares/i)
    userEvent.type(input, "45")
    expect(input).toHaveValue("45")


    screen.debug()
})