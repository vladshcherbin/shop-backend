export default function notFoundResponse(message) {
  return {
    statusCode: 404,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: message || 'Not found'
    })
  }
}
