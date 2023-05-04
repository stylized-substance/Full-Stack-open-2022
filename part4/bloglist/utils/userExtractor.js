const userExtractor = async (request, response, next) => {
  const body = request.body
  if (request.token === undefined) {
    return response.status(401).json({ error: 'Authorization header missing' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  request.user = user

  next()
}

module.exports = userExtractor