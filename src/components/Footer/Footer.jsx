import { find } from 'lodash'
import { useState } from 'react'
import Select from 'react-select'
import i18n from '../../i18n'

const Footer = () => {
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('language') ?? 'en')
  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'pl-PL', label: 'Polski' },
  ]

  const onChange = value => {
    localStorage.setItem(`language`, value)
    setCurrentLang(value)
    i18n.changeLanguage(value)
  }

  return (
    <footer className="footer">
      <>
        Mateusz Ryczek <br /> Praca inżynierska, Uniwersytet Śląski
      </>
      <Select
        aria-label="change language"
        className="footer__select"
        options={languageOptions}
        defaultValue={find(languageOptions, ['value', currentLang])}
        onChange={event => onChange(event.value)}
        menuPlacement="auto"
      />
    </footer>
  )
}

export default Footer
