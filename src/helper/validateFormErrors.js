export  const validateAllInputs = (userErrors) => {
    let errors = 0
    let newErrors = {}
    if (userErrors)
        for (const [key, value] of Object.entries(userErrors)) {
            if (value.isValid === false) {
                value.isTouched = true
                errors++
            }
            newErrors[key] = value
        }
    // console.log(newErrors)
    return {valid: errors === 0, newErrors}
}
