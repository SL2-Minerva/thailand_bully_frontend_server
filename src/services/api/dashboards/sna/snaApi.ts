import moment from 'moment';
import { CallAPI } from 'src/services/CallAPI';

export const GetSNA = (
  campaignId?: string,
  platformId?: string,
  start_date?: any,
  end_date?: any,
  period?: any,
  previousDate?: any,
  previousEndDate?: any,
  keywordId?: any,
  messageId?: any,
  reportNo?: string,
  type?: string,
  fillter_keywords?: any,
  limit?: any
) => {
  let params: any = {};
  params = {
    campaign_id: campaignId || '',
    message_id: messageId || '',
    keyword_id: keywordId || '',
    report_number: reportNo || ''
  };

  if (
    period === 'customrange' &&
    end_date &&
    previousEndDate &&
    start_date !== end_date &&
    previousDate !== previousEndDate
  ) {
    params.start_date = start_date ? moment(start_date).format('YYYY-MM-DD') : '';
    params.end_date = end_date ? moment(end_date).format('YYYY-MM-DD') : '';

    params.start_date_period = previousDate ? moment(previousDate).format('YYYY-MM-DD') : '';
    params.end_date_period = previousEndDate ? moment(previousEndDate).format('YYYY-MM-DD') : '';
    params.keyword_id = fillter_keywords;
    params.type = type;
  } else {
    params.start_date = start_date ? moment(start_date).format('YYYY-MM-DD') : '';
    params.end_date = end_date ? moment(end_date).format('YYYY-MM-DD') : '';
    params.keyword_id = fillter_keywords;
    params.type = type;
  }

  if (platformId) {
    params.source = platformId;
  }

  if (fillter_keywords) {
    params.keyword_id = fillter_keywords;
  }

  if (limit) {
    params.limit = limit;
  }

  const [{ data: response, loading, error }] = CallAPI<{ data?: any }>({
    url: `/sna`,
    method: 'GET',
    params: params
  });

  const responseData = response?.data || [];

  let nodeData: any[] = [];
  let edgeData: any[] = [];
  const uniqueNodeIds = new Set<string>();
  const uniqueEdgeKeys = new Set<string>();

  for (let i = 0; i < responseData.length; i++) {
    const nodes = makeNodes(responseData[i], uniqueNodeIds);
    const edges = makeEdges(responseData[i], uniqueEdgeKeys);
    nodeData = [...nodeData, ...nodes];
    edgeData = [...edgeData, ...edges];
  }

  const snaData = {
    edges: edgeData ?? [],
    nodes: nodeData ?? []
  };

  return {
    resultSNAGraph: snaData,
    loadingSNAGraph: loading,
    errorNetworkGraph: error
  };
};

const makeNodes = (data: any, uniqueIds: Set<string>) => {
  let returnNodes: any = [];

  const parentNode = {
    id: data?.id ?? '',
    label_name: data?.title ?? '',
    title: data?.title ?? '',
    color: data?.color ?? '#63A375',
    shape: 'dot',
    size: data?.size ?? 10,
    link_message: data?.link ?? '',
    length: 10,
    parent_id: ''
  };

  if (!uniqueIds.has(parentNode.id)) {
    uniqueIds.add(parentNode.id);
    returnNodes.push(parentNode);
  }

  const items = data?.items;
  if (items?.length > 0) {
    for (let i = 0; i < items?.length; i++) {
      const childNodesArray = childNodes(items[i], data?.link ?? '', uniqueIds);
      returnNodes = [...returnNodes, ...childNodesArray];
    }
  }

  return returnNodes;
};

const childNodes = (data: any, link: string, uniqueIds: Set<string>) => {
  let returnData: any = [];

  const node = {
    id: data?.id ?? '',
    label_name: data.title ?? '',
    title: data.title ?? '',
    color: data?.color ?? '#63A375',
    shape: 'dot',
    size: data?.size ?? 10,
    link_message: link ?? '',
    length: 10,
    parent_id: ''
  };

  if (!uniqueIds.has(node.id)) {
    uniqueIds.add(node.id);
    returnData.push(node);
  }

  const childItems = data?.items ?? [];
  if (childItems?.length > 0) {
    for (let i = 0; i < childItems?.length; i++) {
      const childNodeArray = childNodes(childItems[i], link ?? '', uniqueIds);
      returnData = [...returnData, ...childNodeArray];
    }
  }

  return returnData;
};

const makeEdges = (data: any, uniqueEdgeKeys: Set<string>) => {
  const items = data?.items;

  const mergeEdgeData: any[] = [];
  if (items?.length > 0) {
    for (let i = 0; i < items?.length; i++) {
      const edge = edgeObject(items[i], data?.id, uniqueEdgeKeys);

      if (edge) {
        mergeEdgeData.push(edge);
      }
    }
  }

  return mergeEdgeData;
};

const edgeObject = (data: any, from: string, uniqueEdgeKeys: Set<string>) => {
  const edgeKey = `${from}-${data?.id}`;

  if (!uniqueEdgeKeys.has(edgeKey)) {
    uniqueEdgeKeys.add(edgeKey);

    const edge = {
      from: from,
      to: data?.id ?? '',
      width: 5,
      length: 300,
      color: data?.color ?? '#fff',
      link_message: data?.link ?? ''
    };

    return edge;
  }

  return null;
};
