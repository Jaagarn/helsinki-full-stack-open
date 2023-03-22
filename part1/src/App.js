const App = () => {

  const Header = (props) => {
    return (
      <>
        <h1>
          {props.course}
        </h1>
      </>
    )
  }

  const Part = (props) => {
    return (
      <>
        <p>
          {props.part} {props.exercises}
        </p>
      </>
    )
  }

  const Content = (props) => {
    return (
      <>
        <Part part={props.partOne[0]} exercises={props.partOne[1]} />
        <Part part={props.partTwo[0]} exercises={props.partTwo[1]} />
        <Part part={props.partThree[0]} exercises={props.partThree[1]} />
      </>
    )
  }

  const Total = (props) => {
    const total = props.totalExercises.reduce(
      (accumulator, currentValue) => accumulator + currentValue, 0);
    return (
      <>
        <p>
          Number of exercises {total} 
        </p>
      </>
    )
  }

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content partOne={[part1, exercises1]} 
               partTwo={[part2, exercises2]} 
               partThree={[part3, exercises3]} />
      <Total totalExercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App