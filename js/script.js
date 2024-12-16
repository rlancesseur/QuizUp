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
let score = 0
let questionActuelle = 0


const afficherQuestion = (questions) => {
    const question = questions[questionActuelle]
    zoneQuestion.innerHTML = question.question
    zoneScore.innerHTML = score
}

const verifieReponse = (questions) => {
    const reponseUtilisateur = document.querySelector('#reponse').value.toLowerCase()
    const bonneReponse = questions[questionActuelle].reponse.toLowerCase()
    if(reponseUtilisateur === bonneReponse) {
        score++
        zoneScore.innerHTML = score
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
        }
        else if(score >= 1 && score < questions.length) {
            resultat.innerHTML = "Vous avez obtenu " + score + " points sur " + questions.length
        }
        else {
            resultat.innerHTML = "Felicitations ! Vous avez toutes les bonnes réponses."
        }
    }
}

const lancerQuizz = (categorie, difficulte) => {
    fetch("js/data/" + categorie + "" + difficulte + ".json")
    .then(response => response.json())
    .then(questions => {

        afficherQuestion(questions)
    
        btnValider.addEventListener("click", () => {
            verifieReponse(questions)
        })
    })
}

//A refaire
const resetQuizz = () => {
    pageResultat.style.display = "none"
    pageMenu.style.display = "flex"
    score = 0
    questionActuelle = 0
    zoneQuestion.innerHTML = ""
    zoneScore.innerHTML = "0"
    resultat.innerHTML = ""
}


btnStart.addEventListener("click", () => {
    const categorie = listeCategorie.value
    const difficulte = niveauDifficulte.value
    pageMenu.style.display = "none"
    pageQuestion.style.display ="flex"
    
    lancerQuizz(categorie, difficulte)
})

btnReset.addEventListener("click", () => {
    resetQuizz()
})
