const inputEl = document.querySelector("#password")
const uppercaseCheck = document.querySelector("#uppercase-check")
const numberCheck = document.querySelector("#number-check")
const symbolCheck = document.querySelector("#symbol-check")
const securityIndicatorEl = document.querySelector('#security-indicator-bar')

let passwordLength = 16

function generatePassword() {
  let chars = "abcdefghjkmnpqrstuvwxyz"

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
  const numberChars = "123456789"
  const symbolChars = "?!@&*()[]"

  if (uppercaseCheck.checked) {
    chars += upperCaseChars
  } 

  if (numberCheck.checked) {
    chars += numberChars
  }

  if (symbolCheck.checked) {
    chars += symbolChars
  }

  let password = ""

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }

  inputEl.value = password
  calculateQuality()
  calculateFontSize()
}

function calculateQuality() {

  const percent = Math.round((passwordLength / 64) * 35 + 
  (uppercaseCheck.checked ? 15 : 0) +
  (numberCheck.checked ? 25 : 0) +
  (symbolCheck.checked ? 25 : 0))
  securityIndicatorEl.style.width = `${percent}%`

   if(percent > 69) {
    securityIndicatorEl.classList.remove('critical')
    securityIndicatorEl.classList.remove('warning')
    securityIndicatorEl.classList.add('safe')
  } else if(percent > 50) {
    securityIndicatorEl.classList.remove('critical')
    securityIndicatorEl.classList.remove('safe')
    securityIndicatorEl.classList.add('warning')
  } else {
    securityIndicatorEl.classList.remove('warning')
    securityIndicatorEl.classList.remove('safe')
    securityIndicatorEl.classList.add('critical')
  }

  if(percent >= 100) {
    securityIndicatorEl.classList.add('completed')
  } else {
    securityIndicatorEl.classList.remove('completed')
  }
}

function calculateFontSize() {
  if(passwordLength > 45) {
    inputEl.classList.remove('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.add('font-xxs')
  } else if(passwordLength > 32) {
    inputEl.classList.remove('font-sm')
    inputEl.classList.add('font-xs')
    inputEl.classList.remove('font-xxs')
  } else if(passwordLength > 22) {
    inputEl.classList.add('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.remove('font-xxs')
  } else {
    inputEl.classList.remove('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.remove('font-xxs')
  }
}

function copy() {
  navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function () {
  passwordLength = passwordLengthEl.value
  document.querySelector('#password-length-text').innerText = passwordLength
  generatePassword()
})

uppercaseCheck.addEventListener('click', generatePassword)
numberCheck.addEventListener('click', generatePassword)
symbolCheck.addEventListener('click', generatePassword)

document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click", generatePassword)

generatePassword()
