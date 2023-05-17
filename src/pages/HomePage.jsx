import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../components/Button/Button'

const HomePage = () => {
  const [query, setQuery] = useState('')
  const { t } = useTranslation()

  const onChange = event => {
    setQuery(event.target.value)
  }

  return (
    <div className="homepage">
      <div className="homepage__container">
        <h1 className="homepage__header">{t('FIND_YOUR_NEW_FLAT')}</h1>

        <div className="homepage__search-wrapper">
          <label htmlFor="search-input" className="search-label">
            {t('CITY_NAME')}:
          </label>

          <div className="search-form">
            <input
              type="text"
              name="searchInput"
              aria-label="search city input"
              className="search-form__search-input"
              placeholder={t('SEARCH_CITIES')}
              onChange={onChange}
            />
            <Button
              customClass="search-form__submit-button"
              linkTo={`/offers`}
              label={t('SEARCH')}
              state={{ data: query }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
