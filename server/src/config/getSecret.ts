const secret = () => {
  const secret = process.env.SECRET

  if (!secret) {
    throw new Error('Secret is not defined.')
  }

  return secret
}

export { secret }
