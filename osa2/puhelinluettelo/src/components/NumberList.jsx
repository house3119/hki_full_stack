const NumberList = ({personsToShow}) => {
    return (
        <div>
        {personsToShow.map(person =>
            <Number
              name = {person.name}
              key = {person.name}
              number = {person.number}
            />
          )}
        </div>

    )
}

const Number = ({ name, key, number }) => <p key={key}>{name} {number}</p>

export default NumberList