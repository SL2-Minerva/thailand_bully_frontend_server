// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// import useMediaQuery from '@mui/material/useMediaQuery'
// import { Theme } from '@mui/material/styles'

const FooterContent = () => {
  // ** Var
  // const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`Copyright © 2023 by `}
        <Box component='span' sx={{ color: 'error.main' }}>
          MINERVA CONSULTANT CO.,LTD
        </Box>
        {`. All right reserved.`}
        <Link target='_blank' href='https://pixinvent.com/'></Link>
      </Typography>
    </Box>
  )
}

export default FooterContent
