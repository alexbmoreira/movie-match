function validateAll(username, email, password1, password2) {
  var errors = []

  if (password1.length > 0 && password2.length > 0) {
    errors = errors.concat(validPassword(password1, password2))
  }

  if (password1.length > 0 && username.length > 0) {
    errors = errors.concat(simPwUsername(username, password1))
  }

  if (username.length > 0) {
    errors = errors.concat(validUsername(username))
  }

  if (email.length > 0) {
    errors = errors.concat(validEmail(email))
  }

  return errors
}

function validPassword(password1, password2) {
  const errors = []

  if (password1.length < 8) {
    errors.push('Password is too short')
  }

  const nonNumericPass = /\D/.test(password1)
  // const passwordCapLetter = /[A-Z]/.test(password1)

  if (!nonNumericPass) {
    errors.push('Password cannot be entirely numeric')
  }

  if (password1 !== password2) {
    errors.push('Passwords must match')
  }

  return errors
}

function simPwUsername(username, password1) {
  const errors = []

  const u = username.toLowerCase()
  const p = password1.toLowerCase()

  if (u === p || p.includes(u)) {
    errors.push('Password and username are too similar')
  }

  return errors
}

function validUsername(username) {
  const errors = []

  if (username.length < 3) {
    errors.push('Username is not long enough')
  }

  return errors
}

function validEmail(email) {
  const errors = []
  const re = /\S+@\S+\.\S+/

  if (!re.test(email)) {
    errors.push('Not a valid email address')
  }

  return errors
}

export default {
  validateAll,
  validPassword,
  validUsername,
  simPwUsername,
  validEmail
}
