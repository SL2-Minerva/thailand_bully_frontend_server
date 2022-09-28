// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import CalendarBlankOutline from 'mdi-material-ui/CalendarBlankOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'User Permission',
      icon: AccountOutline,
      children: [
        {
          title: 'User MGT',
          path: '/apps/user/list'
        },
        {
          title: 'User Role MGT',
          path: '/apps/user/view'
        }
      ]
    },
    {
      title: 'Organized MGT',
      icon: AccountOutline,
      children: [
        {
          title: 'Organized Group MGT',
          path: '/organized-mgt/organized-group'
        },
        {
          title: 'Organized Type MGT',
          path: '/organized-mgt/organized-type'
        },
        {
          title: 'Organized MGT',
          path: '/organized-mgt/management'
        }
      ]
    },
    {
      title: 'Campaign MGT',
      icon: AccountOutline,
      children: [
        {
          title: 'Source MGT',
          path: '/campaign/source-mgt'
        },
        {
          title: 'Domain MGT',
          path: '/campaign/domain-mgt'
        },
        {
          title: 'Campaign MGT',
          path: '/campaign/campaign-mgt'
        }
      ]
    },
    {
      title: 'Report',
      icon: AccountOutline,
      children: [
        {
          title: 'Dashboard',
          path: '/report/dashboard'
        },
        {
          title: 'Report',
          path: '/report/report'
        },
        {
          title: 'System Log Report',
          path: '/report/system-log'
        }
      ]
    }
  ]
}

export default navigation
