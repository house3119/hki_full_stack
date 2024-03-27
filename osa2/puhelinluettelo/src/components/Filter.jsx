const Filter = ({ handleFilter }) => {
    return (
        <div>
            <h2>Filter</h2>
            <form>
                <div>
                    Filter<input onChange={handleFilter}/>
                </div>
            </form>
        </div>
    )
}

export default Filter
