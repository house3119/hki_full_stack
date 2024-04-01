const NumberList = ({personsToShow, handleDelete}) => {
    return (
        <div>
        {personsToShow.map(person =>
            <Number
              name = {person.name}
              key = {person.id}
              number = {person.number}
              handleDelete={() => handleDelete(person.id)}
            />
          )}
        </div>

    )
}

const Number = ({ name, key, number, handleDelete }) => {
  return(
    <div>
      <span key={key}>{name} {number}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default NumberList