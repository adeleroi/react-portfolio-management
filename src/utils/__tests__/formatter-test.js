import formatCurrency from '../formatter'

test('test formatCurrency function', () => {
    const stockPrice = (Math.random() * 100).toFixed(2).toString()
    const len = stockPrice.length
    const expected = stockPrice.toString().padStart(len+1, "$")
    expect(formatCurrency(stockPrice)).toBe(expected)
})