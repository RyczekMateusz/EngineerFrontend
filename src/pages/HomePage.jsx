import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [query, setQuery] = useState('')
  const { t } = useTranslation()

  const onChange = event => {
    setQuery(event.target.value)
  }

  return (
    <div className="homepage">
      <div className="homepage__wrapper">
        <h1 className="homepage__heading">{t('FIND_YOUR_NEW_FLAT')}</h1>

        <div className="search-wrapper">
          <label htmlFor="search-input" className="search-wrapper__search-label">
            {t('CITY_NAME')}:
          </label>

          <div className="search-form">
            <input
              type="text"
              name="searchInput"
              className="search-form__search-input"
              placeholder={t('SEARCH_CITIES')}
              onChange={onChange}
            />
            <Link className="search-form__submit-button" to={`/offers`} state={{ data: query }}>
              {t('SEARCH')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
