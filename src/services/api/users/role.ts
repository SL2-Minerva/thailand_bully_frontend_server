import { CallAPI } from '../../CallAPI'

export const role_list = (reload?: boolean, paged?: boolean, filter?: string, org_id?: number) => {
  const [{ data: res, loading, error }] = CallAPI<{ data?: any }>({
    url: `/role/list`,
    method: 'GET',
    data: { paged, filter, org_id, reload }
  })

  return {
    resultRoleList: res?.data || null,
    loadingRoleList: loading,
    errorRoleList: error
  }
}

const RolesService = () => {
  const [{ data, loading, error }, store] = CallAPI<{
    code: 0 | 1
    message: string
    data: any
  }>(
    {
      url: `/user/update`,
      method: 'POST'
    },
    { manual: true }
  )

  return {
    result_user_create: data?.data,
    loading_user_create: loading,
    error_user_create: error,
    update_user: (userInput: any) => {
      const inputData = userInput

      return new Promise((resolve, reject) => {
        store({
          data: inputData
        })
          .then(({ data: { data, code, message } }) => {
            if (code === 0) {
              reject(message)
            } else {
              resolve(data)
            }
          })
          .catch(ex => {
            reject(ex.toString())
          })
      })
    }
  }
}

export const UserPermission = () => {
  const [{data: res, loading, error} ] = CallAPI<{data?: any;}>({
    url: `/user/info`,
    method: 'GET'
  });
  const overallDashboard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
  const voiceDashboard = ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43'];
  const channelDashbord = ['44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54','55','56'];
  const engagementDashboard = ['57','58','59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75'];
  const sentimentDashboard = ['76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92'];
  const bullyDashboard = ['93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109'];

  // const showAllMenu : any[] = [];

  // for(let i=0; i<109; i++) {
  //   showAllMenu.push(i?.toString());
  // }
  // const report = showAllMenu;
  // resultReportPermission : showAllMenu,

  const report = res?.data?.report; 
  
  let showOverallDashboard = false;
  let showVoiceDashboard = false;
  let showChannelDashboard = false;
  let showEngagementDashboard = false;
  let showSentimentDashboard = false;
  let showBullyDashboard = false;

  if (report && report?.length > 0)  {
     showOverallDashboard = report.some((value : any) => overallDashboard.includes(value));
     showVoiceDashboard = report.some((value: any) => voiceDashboard.includes(value));
     showChannelDashboard = report.some((value: any) => channelDashbord.includes(value));
     showEngagementDashboard = report.some((value: any) => engagementDashboard.includes(value));
     showSentimentDashboard = report.some((value: any) => sentimentDashboard.includes(value));
     showBullyDashboard = report.some((value: any) => bullyDashboard.includes(value));

  }
  
  return {
    resultPermission: res?.data?.permission ||  null,
    resultReportPermission : res?.data?.report || [],
    showOverallDashboard : showOverallDashboard,
    showVoiceDashboard: showVoiceDashboard, 
    showChannelDashboard: showChannelDashboard,
    showEngagementDashboard: showEngagementDashboard,
    showSentimentDashboard: showSentimentDashboard,
    showBullyDashboard: showBullyDashboard,
    loadingUserPermission: loading,
    errorUserPermission: error,
  }
}

export const ReportListPermission = () => {
  const [{data: res, loading, error} ] = CallAPI<{data?: {id: string, title: string, groupName: string}[]}>({
    url: `/permission/report-chart-list`,
    method: 'GET'
  });
  
  return {
    resultReportChartList: res?.data || [], 
    loadingReportChartList: loading, 
    errorReportChartList: error
  }
}

export default RolesService
