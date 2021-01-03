import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({text}) => <h2>{text}</h2>

const Anecdote = ({anec, votes}) => {
  return (
    <>
      {anec}
      <br></br>
      has {votes} vote(s)
    </>
  )
}

const MostVoted = ({maxVoted, score}) => {
  if(score === 0)
    return <h2>No anecdotes has been voted.</h2>
  return(
    <div>
      <Heading text="Anecdote with Most Votes"/>
      <Anecdote anec={maxVoted} votes={score}/>
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
  <button onClick={onClick}>{text}</button>
  )
};

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));
  const [maxVoted, setMaxVoted] = useState(0)

  const generateRandom = () => {
    return Math.floor(Math.random() * 6);
  }

  const incrementVotes = () => {
    let new_votes = [...votes]
    new_votes[selected]++;
    setVotes(new_votes);
  }

  const setRandom = () => {
    let number = generateRandom();
    while(number === selected){
      number = generateRandom();
    }
    setSelected(number);
    } 

    useEffect(() => {
      const maxi = votes.indexOf(Math.max(...votes));
      if(votes[maxi] <= votes[maxVoted])
       return;
      setMaxVoted(maxi);
    }, [votes, maxVoted]);

    const handleClick = (type) => {
      if(type === 'vote')
       incrementVotes();
      else if(type === 'next')
       setRandom();
    }

  return (
    <div>
      <Heading text="Anecdote of the day"/>
      <Anecdote anec={anecdotes[selected]} votes={votes[selected]}/>
      <br></br>
      <Button onClick={() => handleClick('vote')} text='vote'></Button>
      <Button onClick={() => handleClick('next')} text='next anecdote'></Button>
      <MostVoted maxVoted={anecdotes[maxVoted]} score={votes[maxVoted]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)