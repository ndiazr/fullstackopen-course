const Person = ({ person, handleDeletePerson }) => (
  <div>
    {person.name} {person.number}
    <button onClick={handleDeletePerson}>delete</button>
  </div>
)

export default Person