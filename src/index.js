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
    $modal
    $confirmId
    $confirmPw
    $cancelBtn
    $approveBtn

    constructor() {
        this.#initElement()
        this.#addEvent()
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
        this.$modal = document.querySelector('#modal')
        this.$confirmId = this.$modal.querySelector('#confirm-id')
        this.$confirmPw = this.$modal.querySelector('#confirm-pw')
        this.$cancelBtn = this.$modal.querySelector('#cancel-btn')
        this.$approveBtn = this.$modal.querySelector('#approve-btn')
    }

    #addEvent() {
        this.$formWrapper.addEventListener(
            'focusout',
            this.#checkInput.bind(this)
        )

        this.$formWrapper.addEventListener('submit', this.#onSubmit.bind(this))
        this.$cancelBtn.addEventListener('click', () => {
            this.$modal.close()
        })
        this.$approveBtn.addEventListener('click', () => {
            alert('가입되었습니다 🥳')
            this.$modal.close()
        })
    }

    #onSubmit(e) {
        e.preventDefault()
        const result =
            this.#checkIdInput(this.$idInput.value) &&
            this.#checkPasswordInput(this.$pwInput.value) &&
            this.#checkPasswordCheckInput(this.$pwCheckInput)

        if (result) {
            this.$modal.showModal()
            this.$confirmId.textContent = this.$idInput.value
            this.$confirmPw.textContent = this.$pwInput.value
        }
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
        return result
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
        return result
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
        return checkPw.result
    }

    #setErrorMessage($msg, checkObj) {
        $msg.textContent = checkObj.message
    }

    #setPlainMessage($msg, $input) {
        $msg.textContent = ''
        $input.classList.remove('border-red-600')
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
