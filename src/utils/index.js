import fs from 'fs'


async function getCountries() {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  var arrayComNomesDosPaises = []
  
  for (let i = 0; i < 5; i++){
    //bandeira escolhida
    var number = Math.floor(Math.random() * 250 + 1);

    console.log(countries[number])
    // console.log(countries[number].name)

    var bandeiraEscolhida = countries[number].flag

    var dicaCapital = countries[number].capital

    if(dicaCapital == ""){
      console.log('DICA VAZIA')
      dicaCapital = countries[number].region
    }

    var paisEscolhido  = countries[number].name

    var numeroPosicaoNoArray = Math.floor(Math.random() * 4 + 1 -1);

    // console.log('numero array pais escolhido ', numeroPosicaoNoArray)

    for(let i = 0; i < 3; i++){
      //opções de resposta
      number = Math.floor(Math.random() * 250 + 1);

      // console.log(countries[number].name)

      var paisParaAlternativas = countries[number].name

      arrayComNomesDosPaises.push(paisParaAlternativas)
    }
    arrayComNomesDosPaises.splice(numeroPosicaoNoArray, 0, paisEscolhido)
    
  
    console.log('bandeira: ', bandeiraEscolhida)
    console.log('país escolhido: ', paisEscolhido)
    console.log('Dica de capital: ', dicaCapital)
  
    console.log('alternativa 1: ', arrayComNomesDosPaises[0])
    console.log('alternativa 2: ', arrayComNomesDosPaises[1])
    console.log('alternativa 3: ', arrayComNomesDosPaises[2])
    console.log('alternativa 4: ', arrayComNomesDosPaises[3])
  
    console.log('alternativa correta: ', numeroPosicaoNoArray + 1)
  }

  const data = {
    image: bandeiraEscolhida,
    title: "Você conhece essa bandeira?",
    description: dicaCapital,
    answer: numeroPosicaoNoArray + 1,
    alternatives: arrayComNomesDosPaises
  }

  const content = fs.readFileSync('../../db.json', 'utf-8')
  const result =  JSON.parse(content)

  result.questions.push(data)

  const updateFile = JSON.stringify(result)

  fs.writeFileSync('../../db.json', updateFile, 'utf-8')
}

getCountries()

export default getCountries



