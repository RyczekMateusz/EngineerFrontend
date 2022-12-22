import { useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [query, setQuery] = useState('')

  const onChange = event => {
    setQuery(event.target.value)
  }

  return (
    <div className="homepage">
      <div className="homepage__wrapper">
        <h1 className="homepage__heading">Wyszukaj se mieszkanie byq</h1>

        <div className="search-wrapper">
          <label htmlFor="search-input" className="search-wrapper__search-label">
            City name:
          </label>

          <div className="search-form">
            <input
              type="text"
              name="searchInput"
              className="search-form__search-input"
              placeholder="Search for city..."
              onChange={onChange}
            />
            <Link className="search-form__submit-button" to={`/offers`} state={{ data: query }}>
              Search
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
