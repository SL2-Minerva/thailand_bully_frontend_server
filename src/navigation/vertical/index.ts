// ** Icon imports
import CogOutline from 'mdi-material-ui/CogOutline'
import HomeAnalytics from 'mdi-material-ui/HomeAnalytics'
import Pin from 'mdi-material-ui/Pin'
import Finance from 'mdi-material-ui/Finance'
import { NewspaperVariantMultiple } from 'mdi-material-ui' 
import VectorArrangeBelow from 'mdi-material-ui/VectorArrangeBelow'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { UserPermission } from 'src/services/api/users/role'

const navigation = (): VerticalNavItemsType => {
  const { resultPermission, showOverallDashboard, showVoiceDashboard, showChannelDashboard, showBullyDashboard, showEngagementDashboard, showSentimentDashboard } = UserPermission();

  const overallDashboard = {
    "title": "Overall Dashboard",
    "path": "/dashboard/overall"
  };

  const voiceDashboard = {
    "title": "Voice Dashboard",
    "path": "/VoiceDashboard"
  };

  const channelDashboard = {
    "title": "Channel Dashboard",
    "path": "/ChannelDashboard"
  };
  
  const engagementDashboard = {
    "title": "Engagement Dashboard",
    "path": "/EngagementDashboard"
  };
  
  const sentimentDashboard = {
    "title": "Sentiment Dashboard",
    "path": "/SentimentDashboard"
  };

  const bullyDashboard = {
    "title": "Bully Dashboard",
    "path": "/BullyDashboard"
  };

  const reportDashboardList : any[] = [];

  if(showOverallDashboard) {
    reportDashboardList.push(overallDashboard)
  } 
  if(showVoiceDashboard) {
    reportDashboardList.push(voiceDashboard);
  } 
  if(showChannelDashboard) {
    reportDashboardList.push(channelDashboard);
  }
  if(showEngagementDashboard) {
    reportDashboardList.push(engagementDashboard);
  }
  if(showSentimentDashboard) {
    reportDashboardList.push(sentimentDashboard);
  }
  if(showBullyDashboard) {
    reportDashboardList.push(bullyDashboard);
  }

  const UserPermissionData = resultPermission?.user?.authorized_view ? {
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
  } : null;

  const OrganizationPermission = {
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
  };

  const CampaignPermission = resultPermission?.campaign?.authorized_view ? {
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
  } : null;

  const ReportPermission = resultPermission?.report?.authorized_view ? {
    title: 'Reports',
    icon: Finance,
    children: reportDashboardList
  }: null;

  const ContentPermission = {
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
  };

  const LinkOut = {
    title: 'Others',
    icon: VectorArrangeBelow,
    children: [
      {
        openInNewTab: true,
        externalLink: true,
        title: 'Link Out',
        path: 'https://www.youtube.com/watch?v=7hBf9Fxsg6M'
      }
    ]
  };

  const sideMenuBar: any [] = [];

  if(UserPermissionData) {
    sideMenuBar.push(UserPermissionData);
  }

  if (OrganizationPermission) {
    sideMenuBar.push(OrganizationPermission);
  }

  if (CampaignPermission) {
    sideMenuBar.push(CampaignPermission);
  }

  if (ReportPermission) {
    sideMenuBar.push(ReportPermission);
  }

  if (ContentPermission) {
    sideMenuBar.push(ContentPermission);
  }

  if (LinkOut) {
    sideMenuBar.push(LinkOut);
  }

  return sideMenuBar;

  // return [
  //   {
  //     title: 'User Permission',
  //     icon: CogOutline,
  //     children: [
  //       {
  //         title: 'User MGT',
  //         path: '/apps/user/list'
  //       },
  //       {
  //         title: 'User Role MGT',
  //         path: '/apps/user/list/roleManagement'
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Organized MGT',
  //     icon: HomeAnalytics,
  //     children: [
  //       {
  //         title: 'Organized Group MGT',
  //         path: '/organized-mgt/organized-group'
  //       },
  //       {
  //         title: 'Organized Type MGT',
  //         path: '/organized-mgt/organized-type'
  //       },
  //       {
  //         title: 'Organized MGT',
  //         path: '/organized-mgt/management'
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Campaign MGT',
  //     icon: Pin,
  //     children: [
  //       {
  //         title: 'Source MGT',
  //         path: '/campaign/source-mgt'
  //       },
  //       {
  //         title: 'Domain MGT',
  //         path: '/campaign/domain-mgt'
  //       },
  //       {
  //         title: 'Campaign MGT',
  //         path: '/campaign/campaign-mgt'
  //       }
  //     ]
  //   },
  //   {
  //     title: 'Reports',
  //     icon: Finance,
  //     children: [
  //       {
  //         title: 'Overall Dashboard',
  //         path: '/dashboard/overall'
  //       },
  //       {
  //         title: 'Voice Dashboard',
  //         path: '/VoiceDashboard'
  //       }, 
  //       {
  //         title: 'Channel Dashboard', 
  //         path: '/ChannelDashboard'
  //       },
  //       {
  //         title: 'Engagement Dashboard', 
  //         path: '/EngagementDashboard'
  //       },
  //       {
  //         title: 'Sentiment Dashboard', 
  //         path: '/SentimentDashboard'
  //       },
  //       {
  //         title: 'Bully Dashboard', 
  //         path: '/BullyDashboard'
  //       }
        
  //       // ,
  //       // {
  //       //   title: 'Network Graph',
  //       //   path: '/content/content-mgt/NetworkGraph'
  //       // },
  //       // {
  //       //   title: 'Report',
  //       //   path: '/report/report'
  //       // },
  //       // {
  //       //   title: 'System Log Report',
  //       //   path: '/report/system-log'
  //       // }
  //     ]
  //   },
  //   {
  //     title: 'Content',
  //     icon: NewspaperVariantMultiple,
  //     children: [
  //       {
  //         title: 'Contents',
  //         path: '/content/homepage'
  //       },
  //       {
  //         title: 'Content MGT',
  //         path: '/content/content-mgt'
  //       }
  //     ]
  //   },
  // ]
}

export default navigation
