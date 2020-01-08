'use strict'


//stackoverflow 


//récupère le champ de l'erreur
const getUniqueErrorMessage = (err) => {
    let output
    try {
        let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'))
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' existe dèja !'
        
    } catch (ex) {
        output = 'champ unique existant !'
    }

    return output
}

//récupére une erreur dans un objet 
const getErrorMessage = (err) => {
    let message = ''

    if (err.code) {
        switch (err.code) {
            case 11000:
                //à compléter
            case 11001:
                message = getUniqueErrorMessage(err)
                break
            default:
                message = 'Erreur inconnue'
        }
    } else {
        for (let errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message
        }
    }

    return message
}

export default {getErrorMessage}
