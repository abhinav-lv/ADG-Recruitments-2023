const Question = require('../models/Question')

const getRandomQuestions = (allQuestions) => {
    const n1 = allQuestions.length                              // Total no. of questions
    const n2 = 10                                               // No. of questions we actually want
    
    let pool = [...Array(n1).keys()]
    
    var result = []
    
    while (result.length < n2) {
       let index = Math.floor(Math.random() * pool.length)
       result = result.concat([allQuestions[pool.splice(index,1)[0]]])
    }
    return result
}

// ---------------------------------------------------------------------------------------------------------------------------------------

const setQuestions = async (req,res) => {
    try{
        const check = await Question.findOne({
            domain: req.body.domain, 
            subdomain: req.body.subdomain,
        })
        if(check){
            res.status(200).send('Questions for given subdomain already exist')
            return
        }
        const questions = new Question(req.body)
        await questions.save()
        res.status(200).send('Questions received')
    }
    catch(err){
        console.error(err.message)
        res.status(200).send('Questions received, but err')
    }
}

// Need to give random 10 questions
const getQuestions = async (req,res) => {

    if(!req.session.user){
        res.status(403).send('No user session')
        return
    }

    try{
        const { domain, subdomain } = req.body
        const result = await Question.findOne({domain, subdomain})
        
        const questions = result ? result.questions : false

        // Questions not found in database for requested domain/subdomain/yearOfStudy
        if(!questions){
            res.status(400).send('No questions were found for the requested domain')
            return
        }

        // Not supposed to send answers
        const allQuestions = questions.map((question) => {
            return {
                Sno: question.Sno,
                question: question.Question,
                options: {
                    a: question.OptionA,
                    b: question.OptionB,
                    c: question.OptionC,
                    d: question.OptionD,
                }  
            }
        })

        const randomQuestions = getRandomQuestions(allQuestions)

        const body = { domain, subdomain, questions: randomQuestions }

        if(!req.session.user.test.isTakingTest){
            req.session.user.test = {
                ...req.session.user.test,
                isTakingTest: true, 
                testDetails: {domain, subdomain},
                testStartedAt: new Date().toString()
            }   
        }
        res.status(200).send(body)
    }
    catch(err){
        console.error(err)
        res.status(400).send('Error while fetching questions from database')
    }
}

module.exports = { setQuestions, getQuestions }