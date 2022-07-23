export const isIdCorrect = (lb, rb) => ({
    rule: new RegExp(`^[a-z-_0-9]{${lb},${rb}}$`),
    message: `${lb}-${rb}자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.`,
})

export const isPwCorrect = (lb, rb) => ({
    rule: new RegExp(`^[a-zA-Z0-9]{${lb},${rb}}$`),
    message: `${lb}-${rb}자의 영문 대 소문자, 숫자를 사용하세요.`,
})

export const isSamePw = (lh, rh) => ({
    result: lh === rh,
    message: '비밀번호가 일치하지 않습니다',
})
