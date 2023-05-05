// ** Icon imports
import CogOutline from 'mdi-material-ui/CogOutline'
import HomeAnalytics from 'mdi-material-ui/HomeAnalytics'
import Pin from 'mdi-material-ui/Pin'
import Finance from 'mdi-material-ui/Finance'

// import { NewspaperVariantMultiple } from 'mdi-material-ui'
import VectorArrangeBelow from 'mdi-material-ui/VectorArrangeBelow'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { UserPermission } from 'src/services/api/users/role'
import { ClipboardTextClockOutline } from 'mdi-material-ui'

const navigation = (): VerticalNavItemsType => {
  const {
    resultPermission,
    showOverallDashboard,
    showVoiceDashboard,
    showChannelDashboard,
    showBullyDashboard,
    showEngagementDashboard,
    showSentimentDashboard,
    showWordCloud,
    showSNA,
    showCorpus,
    showActivityLog,
    showSNAByBullyLevel,
    showSNAByBullyType,
    showSNABySentiment,
    resultIsAdmin
  } = UserPermission()

  const overallDashboard = {
    title: 'Overall Dashboard',
    path: '/dashboard/overall'
  }

  const voiceDashboard = {
    title: 'Voice Dashboard',
    path: '/VoiceDashboard'
  }

  const channelDashboard = {
    title: 'Channel Dashboard',
    path: '/ChannelDashboard'
  }

  const engagementDashboard = {
    title: 'Engagement Dashboard',
    path: '/EngagementDashboard'
  }

  const sentimentDashboard = {
    title: 'Sentiment Dashboard',
    path: '/SentimentDashboard'
  }

  const bullyDashboard = {
    title: 'Bully Dashboard',
    path: '/BullyDashboard'
  }

  const wordCloudDashboard = {
    title: 'Word Clouds',
    path: '/WordCloud'
  }

  const snaBySentiment = {
      title: 'By Sentiment',
      path: '/SNA'
  }

  const SNAByBullyLevel = {
    title: 'By Bully Level',
    path: '/SNA/SNAByBullyLevel'
  }

  const SNAByBullyType = {
    title: 'By Bully Type',
    path: '/SNA/SNAByBullyType'
  }

  const snaList : any [] = [];
 
  if (showSNABySentiment) {
    snaList.push(snaBySentiment)
  }

  if (showSNAByBullyLevel) {
    snaList.push(SNAByBullyLevel)
  }

  if (showSNAByBullyType) {
    snaList.push(SNAByBullyType)
  }

  const sna = {
    title: 'SNA',
    children: snaList
  }

  const reportDashboardList: any[] = []

  if (showOverallDashboard) {
    reportDashboardList.push(overallDashboard)
  }
  if (showVoiceDashboard) {
    reportDashboardList.push(voiceDashboard)
  }
  if (showChannelDashboard) {
    reportDashboardList.push(channelDashboard)
  }
  if (showEngagementDashboard) {
    reportDashboardList.push(engagementDashboard)
  }
  if (showSentimentDashboard) {
    reportDashboardList.push(sentimentDashboard)
  }
  if (showBullyDashboard) {
    reportDashboardList.push(bullyDashboard)
  }

  if (showWordCloud) {
    reportDashboardList.push(wordCloudDashboard)
  }

  if (showSNA) {
    reportDashboardList.push(sna)
  }

  const UserPermissionData = resultPermission?.user?.authorized_view
    ? {
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
      }
    : null

  const OrganizationPermission = resultPermission?.user?.authorized_view
    ? {
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
      }
    : null

  const sourceMgt = resultIsAdmin
    ? {
        title: 'Source MGT',
        path: '/campaign/source-mgt'
      }
    : null

  const domainMgt = resultIsAdmin
    ? {
        title: 'Domain MGT',
        path: '/campaign/domain-mgt'
      }
    : null

  const campaignMenu = []

  if (sourceMgt) {
    campaignMenu.push(sourceMgt)
  }

  if (domainMgt) {
    campaignMenu.push(domainMgt)
  }

  campaignMenu.push({
    title: 'Campaign MGT',
    path: '/campaign/campaign-mgt'
  })

  const CampaignPermission = resultPermission?.campaign?.authorized_view
    ? {
        title: 'Campaign MGT',
        icon: Pin,
        children: campaignMenu
      }
    : null

  const ReportPermission = resultPermission?.report?.authorized_view
    ? {
        title: 'Reports',
        icon: Finance,
        children: reportDashboardList
      }
    : null

  // const ContentPermission = {
  //   title: 'Content',
  //   icon: NewspaperVariantMultiple,
  //   children: [
  //     {
  //       title: 'Contents',
  //       path: '/content/homepage'
  //     },
  //     {
  //       title: 'Content MGT',
  //       path: '/content/content-mgt'
  //     }
  //   ]
  // }

  const LinkOut = {
    title: 'Corpus',
    icon: VectorArrangeBelow,
    openInNewTab: true,
    externalLink: true,
    path: 'http://202.44.231.31:8080'

    // path: 'http://onlinecorpus.net'
  }

  const log = {
    title: 'Activity Log',
    path: '/ActivityLog',
    icon: ClipboardTextClockOutline
  }

  const sideMenuBar: any[] = []

  if (UserPermissionData) {
    sideMenuBar.push(UserPermissionData)
  }

  if (OrganizationPermission) {
    sideMenuBar.push(OrganizationPermission)
  }

  if (CampaignPermission) {
    sideMenuBar.push(CampaignPermission)
  }

  if (ReportPermission) {
    sideMenuBar.push(ReportPermission)
  }

  // if (ContentPermission) {
  //   sideMenuBar.push(ContentPermission)
  // }

  if (resultIsAdmin || showActivityLog) {
    sideMenuBar.push(log)
  }

  if ((resultIsAdmin || showCorpus) && LinkOut) {
    sideMenuBar.push(LinkOut)
  }

  return sideMenuBar

}

export default navigation
