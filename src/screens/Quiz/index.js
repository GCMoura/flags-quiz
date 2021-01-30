import React from 'react';
import { Lottie } from '@crello/react-lottie';

import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import QuizContainer from '../../components/QuizContainer';
import AlternativesForm from '../../components/AlternativesForm';
import Button from '../../components/Button';
import BackLinkArrow from '../../components/BackLinkArrow';

import loadingAnimation from './animations/loading.json';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>

      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              # {index + 1}
              {' '}
              Resultado: {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
  	<Widget>
      Página de quiz	      
      <Widget.Header>
    	    Carregando...
      </Widget.Header>

      <Widget.Content style={{ display: 'flex', justifyContent: 'center' }}>     
        <Lottie
          width="200px"
          height="200px"
          className="lottie-container basic"
          config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
        />
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {

  console.log('question ', question,
    'questionIndex ', questionIndex,
    'totalQuestions ',totalQuestions,
    'onSubmit ', onSubmit,
    'addResult ', addResult)
  
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;	 
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  
  return (
    <Widget>
      <Widget.Header>
      <BackLinkArrow href="/" />
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2> {question.title} </h2>
        <p> {question.description} </p>
        
        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >

          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })} 

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalBg }, props) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = props[questionIndex];
  const totalQuestions = props.length;
  const bg = externalBg;

  console.log('props ', props )

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 2000);
  }, []);
  
  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );	  
}	

export async function getStaticProps() {

    const countries = await fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        return res.json();
      }) 

      console.log('countries ', countries)

      var arrayComNomesDosPaises = []
      var result = []
      
      for (let i = 0; i < 3; i++){
        //bandeira escolhida
        var number = Math.floor(Math.random() * 250 + 1);
    
        var bandeiraEscolhida = countries[number].flag
    
        var dicaCapital = countries[number].capital
    
        if(dicaCapital == ""){
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
        
      
        // console.log('bandeira: ', bandeiraEscolhida)
        // console.log('país escolhido: ', paisEscolhido)
        // console.log('Dica de capital: ', dicaCapital)
      
        // console.log('alternativa 1: ', arrayComNomesDosPaises[0])
        // console.log('alternativa 2: ', arrayComNomesDosPaises[1])
        // console.log('alternativa 3: ', arrayComNomesDosPaises[2])
        // console.log('alternativa 4: ', arrayComNomesDosPaises[3])
      
        // console.log('alternativa correta: ', numeroPosicaoNoArray + 1)
        var data = {
          image: bandeiraEscolhida,
          title: "De qual país é essa bandeira?",
          description: dicaCapital,
          answer: numeroPosicaoNoArray + 1,
          alternatives: arrayComNomesDosPaises
        }
        result.push(data)
      }

      console.log('result ', result)
       
  return {
    props: result,
  }
}