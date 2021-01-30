
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


}

getCountries()

