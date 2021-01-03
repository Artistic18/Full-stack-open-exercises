import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({text}) => <h1>{text}</h1>;

const Button = ({onClick, text}) => {
  return (
  <button onClick={onClick}>{text}</button>
  )
};

const Statistic = ({name, value}) => {
  return (
     <tr>
       <td>{name}</td>
       <td>{value}</td>
     </tr>
  )
};

const Statistics = ({good, neutral, bad, feed, avg, positive}) => {
    if(feed === 0)
      return <p>No feedback given.</p>
    else{
      return (
         <table>
           <tbody>
             <Statistic name='Good' value={good}/>
             <Statistic name='Neutral' value={neutral}/>
             <Statistic name='Bad' value={bad}/>
             <Statistic name='All' value={feed}/>
             <Statistic name='Average' value={avg}/>
             <Statistic name='Positive' value={positive}/>
           </tbody>
         </table>
      )
    }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total_feed = good + neutral + bad;
  const avg = total_feed ? ((good * 1 + neutral * 0 + bad * -1) / total_feed).toFixed(1):0;
  const positive = total_feed ? `${((good / total_feed) * 100).toFixed(1)}%` : '0%'; 

  const handleClick = (type) => {
    if(type === 'good')
      setGood(good + 1);
    else if(type === 'neutral')
      setNeutral(neutral + 1);
    else if(type === 'bad')
      setBad(bad + 1); 
    } 

  return (
    <div>
      <Heading text="Give Feedback" />
      <Button onClick={() => handleClick('good')} text='good'></Button>
      <Button onClick={() => handleClick('neutral')} text='neutral'></Button>
      <Button onClick={() => handleClick('bad')} text='bad'></Button>
      <Heading text="Statistics"/>
      <Statistics 
        good = {good}
        neutral = {neutral}
        bad = {bad}
        feed = {total_feed}
        avg = {avg}
        positive= {positive}
      />
    </div>
  )
};



ReactDOM.render(<App />, 
  document.getElementById('root')
)