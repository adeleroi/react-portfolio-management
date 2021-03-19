// const formatter = new Intl.NumberFormat('en-US',{
//     style: 'currency',
//     currency: 'USD'
// })

const formatCurrency = (value) => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value)

export default formatCurrency