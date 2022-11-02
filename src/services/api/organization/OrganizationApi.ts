import { CallAPI } from "src/services/CallAPI";

const OrganizationTypeService = (reload?: boolean) => {
    const [{data: res, loading, error}, refetch ] = CallAPI<{data?: any;}>({
      url: `/organization-type/list`,
      method: "GET",
      data: {
        reload: reload
      }
    });
    return{
      result_organization_type_list: res?.data ||  null,
      result_organization_type_list_load: loading,
      error_domain_list: error,
    }
  }

export default OrganizationTypeService
