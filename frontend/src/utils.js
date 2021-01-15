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
  var errors = []

  if (password1.length < 8) {
    errors.push('Password is too short')
  }

  var numericPass = /\d/.test(password1)
  var passwordCapLetter = /[A-Z]/.test(password1)

  if (!numericPass || !passwordCapLetter) {
    errors.push('Password needs an uppercase letter')
  }

  if (password1 !== password2) {
    errors.push('Passwords must match')
  }

  return errors
}

function simPwUsername(username, password1) {
  var errors = []

  var u = username.toLowerCase()
  var p = password1.toLowerCase()

  if (u === p || p.includes(u)) {
    errors.push('Password and username are too similar')
  }

  return errors
}

function validUsername(username) {
  var errors = []

  if (username.length < 3) {
    errors.push('Username is not long enough')
  }

  return errors
}

function validEmail(email) {
  var errors = []
  var re = /\S+@\S+\.\S+/

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
