const PersonForm = ({
  newName,
  newPhone,
  handleNewNameChange,
  handleNewPhoneChange,
  handleAddPerson
}) => (
  <form>
    <div>
      name:
      <input value={newName} onChange={handleNewNameChange} />
    </div>
    <div>
      number:
      <input value={newPhone} onChange={handleNewPhoneChange} />
    </div>
    <div>
      <button type="submit" onClick={handleAddPerson}>
        add
      </button>
    </div>
  </form>
)

export default PersonForm