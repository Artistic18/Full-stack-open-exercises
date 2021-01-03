import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
    return (
    <p>{props.name} {props.exercises}</p>
    )
}

const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
}

const Content = ({parts}) => {
  return (
  <div>
      <Part name={parts[0].name} exercises={parts[0].exercises}/>
      <Part name={parts[1].name} exercises={parts[1].exercises}/>
      <Part name={parts[2].name} exercises={parts[2].exercises}/>
  </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((accumulator, curr) => accumulator + curr.exercises, 0);
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))