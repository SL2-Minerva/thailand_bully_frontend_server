
export const API_PATH = process.env.NEXT_PUBLIC_APP_ENV === 'localhost' ? 'http://127.0.0.1:8000/api' : 'http://cornea-analysis.com/api';

export const GraphicColors = [
    "#4472c4",
    "#ed7d31",
    "#a5a5a5",
    "#ffc000",
    "#5b9bd5",
    "#299b82",
    "#1640a1c4",
    "#d8df20",
    "#e02916",
    "#ffca25",
    "#C0D3DF",
  ];

export const EngagementTransChartColor = [
  '#ed7d31',
  '#ffc000',
  '#4f86b9',
  '#70ad47',
  '#c00000',
  "#4472c4",
  "#a5a5a5",
  "#5b9bd5",
  "#299b82",
  "#1640a1c4",
  "#d8df20",
  "#e02916",
  "#ffca25",
  "#C0D3DF"
]

export const EngagementTypeColors = [
  '#c46627',
  '#ed7d31',
  '#f4b9a4'
]

export const PeriodComparisonChannel = [
  '#4472c4',
  '#8fa2d4'
]

export const SentimentComparisonEngagment = [
  '#e2aa00',
  '#ffd184'
]

export const sentimentComparison = [
  '#62993e',
  '#a1c490'
]

export const BullyDashboardColors = [
  '#ed7d31',
  '#ffc000',
  '#70ad47',
  '#9e480e',
  '#997300'
]

export const FacebookIcon = '/images/logos/facebook-round.png';
export const TwitterIcon = '/images/logos/twitter.png';
export const YoutubeIcon = '/images/logos/youtube-text.png';
export const InstagramIcon = '/images/logos/instagram.png';
export const PantipIcon = '/images/logos/pantip.png';

export const ReportOptions = [
  {
    groupName : 'Overall',
    title : 'Percentage of Messages',
    id: 1
  },
  {
    groupName : 'Overall',
    title : 'Daily Message',
    id: 2
  },
  {
    groupName : 'Overall',
    title : 'Total Message',
    id: 3
  },
  {
    groupName : 'Overall',
    title : 'Total Engagement',
    id: 4
  },
  {
    groupName : 'Overall',
    title : 'Total Account',
    id: 5
  },
  {
    groupName : 'Overall',
    title : 'Keywords',
    id: 6
  },
  {
    groupName : 'Overall',
    title : 'Main Keyword',
    id: 7
  },
  {
    groupName : 'Overall',
    title : 'Top Sites',
    id: 8
  },
  {
    groupName : 'Overall',
    title : 'Top Hashtag',
    id: 9
  },
  {
    groupName : 'Overall',
    title : 'Sentiment Score',
    id: 10
  },
  {
    groupName : 'Overall',
    title : 'Comment Sentiment',
    id: 11
  },
  {
    groupName : 'Overall',
    title : 'Sentiment Level',
    id: 12
  },
  {
    groupName : 'Overall',
    title : 'Word Clouds',
    id: 13
  },
  {
    groupName : 'Overall',
    title : 'Total Message(Word clouds)',
    id: 14
  },
  {
    groupName : 'Overall',
    title : 'Word Clouds(Platforms)',
    id: 15
  },
  {
    groupName : 'Overall',
    title : 'Daily Message',
    id: 16
  },
  {
    groupName : 'Overall',
    title : 'Accounts(Platforms)',
    id: 17
  },
  {
    groupName : 'Overall',
    title : 'Word Clouds(Sentiment)',
    id: 18
  },
  {
    groupName : 'Overall',
    title : 'Accoutns(Sentiment)',
    id: 19
  },
  {
    groupName : 'Voice',
    title : 'Percentage of Message',
    id: 20
  },
  {
    groupName : 'Voice',
    title : 'Daily Messages',
    id: 21
  },
  {
    groupName : 'Voice',
    title : 'Message by Day',
    id: 22
  },
  {
    groupName : 'Voice',
    title : 'Message by Time',
    id: 23
  },
  {
    groupName : 'Voice',
    title : 'Message by Devices',
    id: 24
  },
  {
    groupName : 'Voice',
    title : 'Message by Account',
    id: 25
  },
  {
    groupName : 'Voice',
    title : 'Message by Channel',
    id: 26
  },
  {
    groupName : 'Voice',
    title : 'Message by Sentiment',
    id: 27
  },
  {
    groupName : 'Voice',
    title : 'Message by Bully Level',
    id: 28
  },
  {
    groupName : 'Voice',
    title : 'Message by Bully Type',
    id: 29
  },
  {
    groupName : 'Voice',
    title : 'Number of Accounts',
    id: 30
  },
  {
    groupName : 'Voice',
    title : 'Period over Period comparison(Messages)',
    id: 31
  },
  {
    groupName : 'Voice',
    title : 'Period over Period comparison(Accounts)',
    id: 32
  },
  {
    groupName : 'Voice',
    title : 'Day&Time Comparison',
    id: 33
  },
  {
    groupName : 'Voice',
    title : 'Day&Time by Sentiment',
    id: 34
  },
  {
    groupName : 'Voice',
    title : 'Day&Time by Bully Level',
    id: 35
  },
  {
    groupName : 'Voice',
    title : 'Day&Time by Bully Type',
    id: 36
  },
  {
    groupName : 'Voice',
    title : 'Period over Period comparison(Channel/Platforms)',
    id: 37
  },
  {
    groupName : 'Voice',
    title : 'Period over Period comparison(Devices)',
    id: 38
  },
  {
    groupName : 'Voice',
    title : 'Period over Period comparison(Channel vs Devices)',
    id: 39
  },
  {
    groupName : 'Voice',
    title : 'Percentage of Keyword Comparison By Channel',
    id: 40
  },
  {
    groupName : 'Voice',
    title : 'Percentage of Keyword Comparison By Sentiment',
    id: 41
  },
  {
    groupName : 'Voice',
    title : 'Percentage of Keyword Comparison By Bully Level',
    id: 42
  },
  {
    groupName : 'Voice',
    title : 'Percentage of Keyword Comparison By Bully Type',
    id: 43
  },
  {
    groupName : 'Channel',
    title : 'Percentage of Channel',
    id: 44
  },
  {
    groupName : 'Channel',
    title : 'Daily Channel',
    id: 45
  },
  {
    groupName : 'Channel',
    title : 'Channel by Day',
    id: 46
  },
  {
    groupName : 'Channel',
    title : 'Channel by Time',
    id: 47
  },
  {
    groupName : 'Channel',
    title : 'Channel by Devices',
    id: 48
  },
  {
    groupName : 'Channel',
    title : 'Channel by Account',
    id: 49
  },
  {
    groupName : 'Channel',
    title : 'Channel by Sentiment',
    id: 50
  },
  {
    groupName : 'Channel',
    title : 'Channel by Bully Level',
    id: 51
  },
  {
    groupName : 'Channel',
    title : 'Channel by Bully Type',
    id: 52
  },
  {
    groupName : 'Channel',
    title : 'Period over Period Comparison',
    id: 53
  },
  {
    groupName : 'Channel',
    title : 'Engagement Rate',
    id: 54
  },
  {
    groupName : 'Channel',
    title : 'Sentiment Score',
    id: 55
  },
  {
    groupName : 'Channel',
    title : 'Channel by Sentiment',
    id: 56
  },
  {
    groupName : 'Engagement',
    title : 'Percentage of Engagement Trans',
    id: 57
  },
  {
    groupName : 'Engagement',
    title : 'Daily Engagement',
    id: 58
  },
  {
    groupName : 'Engagement',
    title : 'Engagement by Day',
    id: 59
  },
  {
    groupName : 'Engagement',
    title : 'Engagement by Time',
    id: 60
  },
  {
    groupName : 'Engagement',
    title : 'Engagement by Devices',
    id: 61
  },
  {
    groupName : 'Engagement',
    title : 'Engagement by Account',
    id: 62
  },
  {
    groupName : 'Engagement',
    title : 'Engagement by Channel',
    id: 63
  },
  {
    groupName : 'Engagement',
    title : 'Percentage of Engagement Type ',
    id: 64
  },
  {
    groupName : 'Engagement',
    title : 'Daily Engagement',
    id: 65
  },
  {
    groupName : 'Engagement',
    title : 'Engagement by Day',
    id: 66
  },
  {
    groupName : 'Engagement',
    title : 'Engagement by Time',
    id: 67
  },
  {
    groupName : 'Engagement',
    title : 'Engagement by Devices',
    id: 68
  },
  {
    groupName : 'Engagement',
    title : 'Engagement by Account',
    id: 69
  },
  {
    groupName : 'Engagement',
    title : 'Engagement by Channel',
    id: 70
  },
  {
    groupName : 'Engagement',
    title : 'Total Engagement',
    id: 71
  },
  {
    groupName : 'Engagement',
    title : 'Engagement Comparison by Channel',
    id: 72
  },
  {
    groupName : 'Engagement',
    title : 'Engagement Comparison by Sentiment',
    id: 73
  },
  {
    groupName : 'Engagement',
    title : 'Engagement Type Comparison',
    id: 74
  },
  {
    groupName : 'Engagement',
    title : 'Summary Engagement by Account',
    id: 75
  },
  {
    groupName : 'Sentiment',
    title : 'Daily Sentiment',
    id: 78
  },
  {
    groupName : 'Sentiment',
    title : 'Percentage of Sentiment',
    id: 79
  },
  {
    groupName : 'Sentiment',
    title : 'Sentiment by Day',
    id: 80
  },
  {
    groupName : 'Sentiment',
    title : 'Sentiment by Time',
    id: 81
  },
  {
    groupName : 'Sentiment',
    title : 'Sentiment by Devices',
    id: 82
  },
  {
    groupName : 'Sentiment',
    title : 'Sentiment by Account',
    id: 83
  },
  {
    groupName : 'Sentiment',
    title : 'Sentiment by Channel',
    id: 84
  },
  {
    groupName : 'Sentiment',
    title : 'Sentiment by Bully Level',
    id: 85
  },
  {
    groupName : 'Sentiment',
    title : 'Sentiment by Bully Type',
    id: 86
  },
  {
    groupName : 'Sentiment',
    title : 'Total Message',
    id: 87
  },
  {
    groupName : 'Sentiment',
    title : 'Engagement Comparison by Channel',
    id: 88
  },
  {
    groupName : 'Sentiment',
    title : 'Engagement Comparison by Engagement Type',
    id: 89
  },
  {
    groupName : 'Sentiment',
    title : 'Sentiment Score',
    id: 90
  },
  {
    groupName : 'Sentiment',
    title : 'Engagement Type Comparison',
    id: 91
  },
  {
    groupName : 'Sentiment',
    title : 'Summary Sentiment Score by Account',
    id: 92
  },
  {
    groupName : 'Sentiment',
    title : 'Summary Sentiment Score by Channel',
    id: 93
  },
  {
    groupName : 'Sentiment',
    title : 'Keywords',
    id: 94
  }
]