const PersonForm = ({
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange,
    handleClick
    }) => {
        return (
            <div>
                <form>
                    <div>
                        Name: <input onChange={handleNameChange} value={newName} />
                    </div>
                    <div>
                        Number: <input onChange={handleNumberChange} value={newNumber} />
                    </div>
                    <div>
                        <button type="submit" onClick={handleClick}>add</button>
                    </div>
                </form>
            </div>
        )
}

export default PersonForm