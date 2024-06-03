import Person from './Person'

const Persons = ({
  search,
  filterPersons,
  persons,
  handleDeletePerson
}) => (
  <>
    {
      search.length > 0 ? (
        filterPersons.map(person => 
          <Person
            key={person.id}
            person={person}
            handleDeletePerson={() => handleDeletePerson(person)}
          />
        )
      ) : (
        persons.map(person => 
          <Person
            key={person.id}
            person={person}
            handleDeletePerson={() => handleDeletePerson(person)}
          />
        )
      )
    }
  </>
)

export default Persons