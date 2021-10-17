export default function generatePolicy(principalId, effect, resource) {
  return {
    principalId,
    ...(effect && resource && {
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource
          }
        ]
      }
    })
  }
}
