import React from 'react';

const Course = (course) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises
    const total = course.parts.reduce(reducer, 0)
  
    const rows = () => course.parts.map(part =>
        <Part
            key={part.id}
            part={part}
        />
    )
  
    return (
        <div>
            <h2>
            {course.name}
            </h2>
            {rows()}
            <b>total of {total} exercises</b>
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

export default Course