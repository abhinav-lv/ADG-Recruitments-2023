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

getRandomQuestions([
    {Sno: 1, question: 'your mom'},
    {Sno: 2, question: 'your sis'},
    {Sno: 3, question: 'your dad'},
    {Sno: 4, question: 'your bro'},
    {Sno: 5, question: 'your bitch'},
    {Sno: 6, question: 'your slut'},
    {Sno: 7, question: 'your pops'}
])