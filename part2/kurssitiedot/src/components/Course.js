const Header = ({ text }) => {
    return (
        <div>
            <h1>{text}</h1>
        </div>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <div>
            <p>
                {name} {exercises}
            </p>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, { exercises }) => sum + exercises, 0)
    return (
        <div>
            <p>
                <strong>
                    Total number of exercises {total}
                </strong>
            </p>
        </div>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header text={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
            <hr></hr>
        </div>
    )
}

export default Course