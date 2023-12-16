import bcrypt from 'bcrypt'

const saltRounds = 10

const hash = async (password) => {
  return bcrypt.hash(password, saltRounds)
}

const compare = async (password, hash) => {
  return bcrypt.compare(password, hash)
}

export { hash, compare }
