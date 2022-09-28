// ** Icon imports
import CogOutline from 'mdi-material-ui/CogOutline'
import HomeAnalytics from 'mdi-material-ui/HomeAnalytics'
import Pin from 'mdi-material-ui/Pin'
import Finance from 'mdi-material-ui/Finance'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'User Permission',
      icon: CogOutline,
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
      icon: HomeAnalytics,
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
      icon: Pin,
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
      icon: Finance,
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
