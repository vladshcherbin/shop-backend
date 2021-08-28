module.exports.productsList = async () => ({
  statusCode: 200,
  body: JSON.stringify([
    {
      id: 1,
      title: 'product 1'
    },
    {
      id: 2,
      title: 'product 1'
    }
  ])
})
