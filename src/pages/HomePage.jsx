import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useMedia } from 'react-use'

const HomePage = () => {
  const [query, setQuery] = useState('')
  const { t } = useTranslation()
  const isMobile = useMedia('(max-width: 599px)')

  const onChange = event => {
    setQuery(event.target.value)
  }

  return (
    <div className="homepage">
      <div className="homepage__wrapper">
        <h1 className="homepage__heading">{t('FIND_YOUR_NEW_FLAT')}</h1>

        <div className={clsx('search-wrapper', isMobile && 'search-wrapper--mobile')}>
          <label
            htmlFor="search-input"
            className={clsx('search-wrapper__search-label', isMobile && 'search-wrapper__search-label--mobile')}>
            {t('CITY_NAME')}:
          </label>

          <div className={clsx('search-form', isMobile && 'search-form--mobile')}>
            <input
              type="text"
              name="searchInput"
              aria-label="search city input"
              className={clsx('search-form__search-input', isMobile && 'search-form__search-input--mobile')}
              placeholder={t('SEARCH_CITIES')}
              onChange={onChange}
            />
            <Link
              className={clsx('search-form__submit-button', isMobile && 'search-form__submit-button--mobile')}
              to={`/offers`}
              state={{ data: query }}>
              {t('SEARCH')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
