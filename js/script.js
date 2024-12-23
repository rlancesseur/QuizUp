const pageMenu = document.querySelector('#pageMenu')
const pageQuestion = document.querySelector('#pageQuestions')
const pageResultat = document.querySelector('#pageResultat')
const listeCategorie = document.querySelector("#categories")
const niveauDifficulte = document.querySelector("#difficulte")
const zoneQuestion = document.querySelector('#question')
const zoneReponse = document.querySelector('#reponse')
const zoneScore = document.querySelector('#score')
const resultat = document.querySelector('#resultat')
const btnCategorie = document.querySelector('#btnCategorie')
const btnReset = document.querySelector('#btnReset')
const btnStart = document.querySelector('#btnStart')
const btnRecommencer = document.querySelector('#btnRecommencer')
const btnSuivant = document.querySelector('#btnSuivant')
const btnPseudo = document.querySelector('#btnPseudo')
const pagePseudo = document.querySelector('#pagePseudo')
const inputPseudo = document.querySelector('#inputPseudo')
const pseudo = document.querySelector('#pseudo')
let pseudoUtilisateur = ""
let score = 0
let questionActuelle = 0


const afficherQuestion = (questions) => {
    const question = questions[questionActuelle]
    zoneQuestion.innerHTML = question.question
    pseudo.innerHTML = pseudoUtilisateur
    zoneScore.innerHTML = score
    zoneReponse.focus()
}

const verifieReponse = (questions) => {
    const reponseUtilisateur = document.querySelector('#reponse').value.toLowerCase()
    const bonneReponse = questions[questionActuelle].reponse.toLowerCase()
    if(reponseUtilisateur === bonneReponse) {
        score++
    }
    questionActuelle++
    zoneReponse.value = ""

    if(questionActuelle < questions.length) {
        afficherQuestion(questions)
    }
    else {
        pageQuestion.style.display = "none"
        pageResultat.style.display = "flex"
        if(score === 0) {
            resultat.innerHTML = "Dommage, vous n'avez obtenu aucun point"
            btnRecommencer.style.display = "block"
        }
        else if(score >= 1 && score < questions.length / 2) {
            resultat.innerHTML = "Vous avez obtenu " + score + " points sur " + questions.length
            btnRecommencer.style.display = "block"
        }
        else if(score >= questions.length / 2 && score < questions.length) {
            resultat.innerHTML = "Vous avez obtenu " + score + " points sur " + questions.length + ". Vous pouvez passer au niveau suivant !"
            btnSuivant.style.display = "block"
        }
        else {
            resultat.innerHTML = "Felicitations ! Vous avez toutes les bonnes réponses. Vous pouvez passer au niveau suivant !"
            btnSuivant.style.display = "block"
        }
    }
}

const lancerQuizz = (categorie, difficulte) => {
    fetch("js/data/" + categorie + "" + difficulte + ".json")
    .then(response => response.json())
    .then(questions => {

        afficherQuestion(questions)
    
        btnValider.addEventListener("click", () => verifieReponse(questions))
    })
}

btnPseudo.addEventListener("click", () => {
    if(inputPseudo.value.length < 1) {
        alert("Veuillez saisir un pseudo")
    }
    else {
        pagePseudo.style.display = "none"
        pageMenu.style.display = "flex"
        pseudoUtilisateur = inputPseudo.value
    }
})

btnStart.addEventListener("click", () => {
    const categorie = listeCategorie.value
    const difficulte = niveauDifficulte.value
    pageMenu.style.display = "none"
    pageQuestion.style.display = "flex"
    
    lancerQuizz(categorie, difficulte)
})

//A refaire
btnReset.addEventListener("click", () => {
    btnValider.removeEventListener("click", verifieReponse) // Ne remove pas le bon écouteur
    score = 0
    questionActuelle = 0
    pageResultat.style.display = "none"
    pageMenu.style.display = "flex"
})

//A refaire
btnRecommencer.addEventListener("click", () => {
    btnValider.removeEventListener("click", verifieReponse) // Ne remove pas le bon écouteur
    score = 0
    questionActuelle = 0
    pageResultat.style.display = "none"
    pageQuestion.style.display ="flex"
    
    lancerQuizz(listeCategorie.value, niveauDifficulte.value)
})

//A refaire
btnSuivant.addEventListener("click", () => {
    btnValider.removeEventListener("click", verifieReponse) // Ne remove pas le bon écouteur
    score = 0
    questionActuelle = 0
    niveauDifficulte.value++
    pageResultat.style.display = "none"
    pageQuestion.style.display ="flex"
    
    lancerQuizz(listeCategorie.value, niveauDifficulte.value)
})
