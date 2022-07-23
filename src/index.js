import { isIdCorrect, isPwCorrect, isSamePw } from './verifyRegExp.js'

class SignupForm {
    $formWrapper
    $idInput
    $idMsg
    $pwInput
    $pwMsg
    $pwCheckInput
    $pwCheckMsg
    $submit
    isValid
    constructor() {
        this.#initElement()
        this.#addEvent()
        this.#focusOnIdInput()
    }

    #initElement() {
        this.$formWrapper = document.querySelector('.form-wrapper')
        this.$idInput = this.$formWrapper.querySelector('#id')
        this.$idMsg = this.$formWrapper.querySelector('#id-msg')
        this.$pwInput = this.$formWrapper.querySelector('#pw')
        this.$pwMsg = this.$formWrapper.querySelector('#pw-msg')
        this.$pwCheckInput = this.$formWrapper.querySelector('#pw-check')
        this.$pwCheckMsg = this.$formWrapper.querySelector('#pw-check-msg')
        this.$submit = this.$formWrapper.querySelector('#submit')
    }

    #addEvent() {
        window.addEventListener('load', this.#focusOnIdInput.bind(this))
        this.$formWrapper.addEventListener(
            'focusout',
            this.#checkInput.bind(this)
        )

        this.$formWrapper.addEventListener('submit', this.#onSubmit.bind(this))
    }

    #onSubmit(e) {
        e.preventDefault()
        this.#setSubmitDisabled()
        console.log('submit')
    }

    #setSubmitDisabled() {
        if (this.isValid === false) {
            this.$submit.disabled = true
        } else {
            this.$submit.disabled = false
        }
    }

    #setIsValidTrue() {
        this.isValid = true
    }

    #setIsValidFalse() {
        this.isValid = false
    }

    #focusOnIdInput() {
        this.$idInput.focus()
    }

    #checkInput(e) {
        const { id, value } = e.target
        if (id === 'id') {
            this.#checkIdInput(value)
        } else if (id === 'pw') {
            this.#checkPasswordInput(value)
        } else if (id === 'pw-check') {
            this.#checkPasswordCheckInput(value)
        }
        //this.#setSubmitDisabled()
    }

    #checkIdInput(value) {
        if (this.#isNothingInInput(value, this.$idMsg, this.$idInput)) return

        const checkId = isIdCorrect(5, 20)
        const result = checkId.rule.test(value)
        if (!result) {
            this.#setErrorMessage(this.$idMsg, checkId)
        } else {
            this.#setPlainMessage(this.$idMsg, this.$idInput)
        }
        //this.#setSubmitDisabled()
    }

    #checkPasswordInput(value) {
        if (this.#isNothingInInput(value, this.$pwMsg, this.$pwInput)) return

        const checkPw = isPwCorrect(8, 16)
        const result = checkPw.rule.test(value)
        if (!result) {
            this.#setErrorMessage(this.$pwMsg, checkPw)
        } else {
            this.#setPlainMessage(this.$pwMsg, this.$pwInput)
        }
        //this.#setSubmitDisabled()
    }

    #checkPasswordCheckInput(value) {
        if (this.#isNothingInInput(value, this.$pwCheckMsg, this.$pwCheckInput))
            return

        const checkPw = isSamePw(this.$pwCheckInput.value, this.$pwInput.value)
        if (!checkPw.result) {
            this.#setErrorMessage(this.$pwCheckMsg, checkPw)
        } else {
            this.#setPlainMessage(this.$pwCheckMsg, this.$pwCheckInput)
        }
    }

    #setErrorMessage($msg, checkObj) {
        $msg.textContent = checkObj.message
        //this.#setIsValidFalse()
    }

    #setPlainMessage($msg, $input) {
        $msg.textContent = ''
        $input.classList.remove('border-red-600')
        //this.#setIsValidTrue()
    }

    #isNothingInInput(value, $msg, $input) {
        if (value === '') {
            const message = '필수 정보입니다'
            $msg.textContent = message
            $input.classList.add('border-red-600')
            //this.#setIsValidFalse()
            return true
        }
        return false
    }
}
new SignupForm()
