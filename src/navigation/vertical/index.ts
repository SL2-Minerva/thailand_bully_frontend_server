// ** Icon imports
import CogOutline from 'mdi-material-ui/CogOutline'
import HomeAnalytics from 'mdi-material-ui/HomeAnalytics'
import Pin from 'mdi-material-ui/Pin'
import Finance from 'mdi-material-ui/Finance'
import { NewspaperVariantMultiple } from 'mdi-material-ui' 

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
          path: '/apps/user/list/roleManagement'
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
      title: 'Reports',
      icon: Finance,
      children: [
        {
          title: 'Overall Dashboard',
          path: '/dashboard/overall'
        },
        {
          title: 'Voice Dashboard',
          path: '/VoiceDashboard'
        }, 
        {
          title: 'Channel Dashboard', 
          path: '/ChannelDashboard'
        },
        {
          title: 'Engagement Dashboard', 
          path: '/EngagementDashboard'
        },
        {
          title: 'Sentiment Dashboard', 
          path: '/SentimentDashboard'
        },
        {
          title: 'Bully Dashboard', 
          path: '/BullyDashboard'
        }
        
        // ,
        // {
        //   title: 'Network Graph',
        //   path: '/content/content-mgt/NetworkGraph'
        // },
        // {
        //   title: 'Report',
        //   path: '/report/report'
        // },
        // {
        //   title: 'System Log Report',
        //   path: '/report/system-log'
        // }
      ]
    },
    {
      title: 'Content',
      icon: NewspaperVariantMultiple,
      children: [
        {
          title: 'Contents',
          path: '/content/homepage'
        },
        {
          title: 'Content MGT',
          path: '/content/content-mgt'
        }
      ]
    },
  ]
}

export default navigation
