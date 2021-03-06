function isAlphaNumeric(text){
    var x, i;
    for (i = 0; i < text.length; i++){
        x = text.charCodeAt(i);
        if (!(x > 47 && x < 58) && !(x > 64 && x < 91) && !(x > 96 && x < 123)){
            return false;
            }
    }
    return true;
}

function beginWithChar(text){
    x = text.charCodeAt(0);
    if (!(x > 64 && x < 91) && !(x > 96 && x < 123)){
        return false;
        }
    return true;
}

function containsUpper(text){
    var x, i;
    for (i = 0; i < text.length; i++){
        x = text.charCodeAt(i);
        if (!(x > 64 && x < 91)){
            return false;
            }
    }
    return true;
}

function containsNumber(text){
    var x, i;
    for (i = 0; i < text.length; i++){
        x = text.charCodeAt(i);
        if (!(x > 47 && x < 58)){
            return false;
            }
    }
    return true;
}

function containsSpecial(text){
    var x, i;
    for (i = 0; i < text.length; i++){
        x = text.charCodeAt(i);
        if (x){
            return false;
            }
    }
    return true;
}

function passwordsMatch(password, cpassword){
    if(password === cpassword){
        return true;
    }
    return false;
}

let regFormInputs = document.getElementsByClassName("text-input");
[...regFormInputs].forEach((input) => {
    input.addEventListener("focus", showValidationDiv, false);
    switch(input.getAttribute("id")){
        case "username":
            input.addEventListener("input", updateUserValidation, false);
            break;
        case "email":
            input.addEventListener("input", updateEmailValidation, false);
            break;
        case "password":
            input.addEventListener("input", updatePasswordValidation, false);
            break;
    }
})