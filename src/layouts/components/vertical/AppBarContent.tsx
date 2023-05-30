// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import MenuIcon from 'mdi-material-ui/Menu'
import clsx from 'clsx'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'

// import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
// import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import { GetInfoTransaction } from 'src/services/api/users/users'
import React from 'react'
import { createStyles, makeStyles } from '@mui/styles'
import { createTheme } from '@mui/material'

const defaultTheme = createTheme()

export const useStyles = makeStyles(
  () =>
    createStyles({
      root: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 26,
        borderRadius: 2
      },
      value: {
        position: 'absolute',
        lineHeight: '24px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      },
      bar: {
        height: '100%'
      }
    }),
  { defaultTheme }
)

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

interface ProgressBarProps {
  value: number
  color: string
}

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value, color } = props
  const valueInPercent = value
  const classes = useStyles()

  return (
    <div
      className={classes.root}
      style={{
        border: `1px solid ` + color
      }}
    >
      {valueInPercent ? (
        <>
          <div className={classes.value}>{`${valueInPercent ? valueInPercent.toLocaleString() : ''}`}</div>
          <div
            className={clsx(classes.bar, {
              low: valueInPercent < 30,
              medium: valueInPercent >= 30 && valueInPercent <= 70,
              high: valueInPercent > 70
            })}
            style={{
              maxWidth: `${valueInPercent ? valueInPercent : ''}`,
              backgroundColor: color
            }}
          />
        </>
      ) : (
        ''
      )}
    </div>
  )
})

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, toggleNavVisibility, saveSettings } = props
  const { userInfoTransaction } = GetInfoTransaction()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <MenuIcon />
          </IconButton>
        ) : null}
        <Autocomplete hidden={hidden} settings={settings} />
        {userInfoTransaction ? (
          <Box sx={{ width: '400px', mt: 4 }}>
            Transaction per month start({userInfoTransaction?.transaction_start_at}) <br />
            <Box sx={{ display: 'flex', mt: 2 }}>
              <ProgressBar value={Number(userInfoTransaction?.transaction_reamining)!} color='#cccc00' />
              <ProgressBar value={Number(userInfoTransaction?.transaction_limit)!} color='#fff' />
            </Box>
          </Box>
        ) : (
          ''
        )}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {/*<NotificationDropdown settings={settings} /> */}
        <UserDropdown settings={settings} />
      </Box>
    </Box>
  )
}

export default AppBarContent
