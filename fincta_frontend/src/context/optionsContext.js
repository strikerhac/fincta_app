import React, { useState, createContext } from "react";
import axios, { baseUrl } from "../utils/axios";
import { transaction } from "../utils/constants";
// import { useHistory } from "react-router-dom";
import moment from "moment";

export const DropDownOptionsContext = createContext();

const OptionsContext = (props) => {
  // const history = useHistory();
  const [lenderOptions, setLenderOptions] = useState([]);
  const [inventoryOptions, setInventoryOptions] = useState([]);
  const [inventories, setInventory] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [assetOptions, setAssetOptions] = useState([]);
  const [assets, setAssets] = useState([]);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [subscriptionOptions, setSubscriptionOptions] = useState([]);
  const [utilityLookups, setUtilityLookups] = useState([]);
  const [adminLookups, setAdminLookups] = useState([]);
  const [marketingLookups, setMarketingLookups] = useState([]);
  const [serviceLookups, setServiceLookups] = useState([]);
  const [miscellaneousIncomeLookups, setMiscellaneousIncomeLookups] = useState(
    []
  );
  const [inventoryTransactions, setInventoryTransactions] = useState([]);
  const [assetTransactions, setAssetTransactions] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [receivableTransactions, setReceivableTransactions] = useState([]);
  const [payableTransactions, setPayableTransactions] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loanInstallments, setLoanInstallments] = useState([]);
  //ScrollToTop
  const [scrollToTop, setScrollToTop] = useState(false);
  //build calculator
  // const [overheadValues, setOverheadValues] = useState([]);
  // const [overheadRows, setOverheadRows] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);
  const [performanceTrackerData, setPerformanceTrackerData] = useState(null);

  const getPerformanceTrackerData = async () => {
    await axios
      .get(`${baseUrl}/getters/performance`)
      .then((res) => {
        console.log(res);
        setPerformanceTrackerData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDashboardData = async (period) => {
    await axios
      .get(`${baseUrl}/getters/dashboard/${period}`)
      .then((res) => {
        console.log(res);
        setDashboardData(res.data);
      })
      .catch((err) => {
        setDashboardData(false);
      });
  };

  const createInventoryOptions = (list = []) => {
    let options = [];
    list.forEach((element) => {
      options.push({
        value: element._id,
        label: `${element.company}(${element.name})`,
      });
    });
    return options;
  };

  const createLenderOptions = (list = []) => {
    let options = [];
    list.forEach((element) => {
      options.push({
        value: element._id,
        label: `${element.name}(${element.city})`,
      });
    });
    return options;
  };

  const createPersonOptions = (list = []) => {
    let options = [];
    list.forEach((element) => {
      console.log(element);
      options.push({
        value: element._id,
        label: `${element.firstName} ${element.lastName}`,
      });
    });
    return options;
  };

  const createAssetOptions = (list = []) => {
    let options = [];
    list.forEach((element) => {
      console.log(element);
      options.push({
        value: element._id,
        label: `${element.name} ${element.type}`,
      });
    });
    return options;
  };

  const createSubscriptionOptions = (list = []) => {
    let options = [];
    list.forEach((element) => {
      console.log(element);
      options.push({
        value: element._id,
        label: `${element.name} ${element.periodDuration}`,
      });
    });
    return options;
  };

  const createLookupOptions = (list = []) => {
    let options = [];
    list.forEach((element) => {
      console.log(element);
      options.push({
        value: element._id,
        label: `${element.name}`,
      });
    });
    return options;
  };

  const getLenders = async () => {
    await axios
      .get(`${baseUrl}/lenders`)
      .then((response) => {
        console.log(response.data);
        setLenderOptions(createLenderOptions(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInventories = async () => {
    await axios
      .get(`${baseUrl}/inventories`)
      .then((response) => {
        console.log(response.data);
        setSearchData(response.data);
        setInventory(response.data);
        setInventoryOptions(createInventoryOptions(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
    // let a = 0;
    // for (let i = 0; i < 100000; i++) {
    //   for (let i = 0; i < 100000; i++) {
    //     a = a + i;
    //     a = a * 2;
    //     a = 0;
    //   }
    // }
    // console.log({ a });
    // console.log("wowwwww khesi bat hai");
    return null;
  };

  const getSuppliers = async () => {
    await axios
      .get(`${baseUrl}/suppliers`)
      .then((response) => {
        console.log(response.data);
        setSupplierOptions(createPersonOptions(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAssets = async () => {
    await axios
      .get(`${baseUrl}/assets`)
      .then((response) => {
        console.log(response.data);
        setSearchData(response.data);
        setAssets(response.data);
        setAssetOptions(createAssetOptions(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCustomers = async () => {
    await axios
      .get(`${baseUrl}/customers`)
      .then((response) => {
        console.log(response.data);
        setCustomerOptions(createPersonOptions(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEmployees = async () => {
    await axios
      .get(`${baseUrl}/employees`)
      .then((response) => {
        console.log(response.data);
        setEmployeeOptions(createPersonOptions(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSubscriptions = async () => {
    await axios
      .get(`${baseUrl}/subscriptions`)
      .then((response) => {
        console.log(response.data);
        setSubscriptionOptions(createSubscriptionOptions(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUtilityLookups = async (subAccount) => {
    await axios
      .get(`${baseUrl}/lookups/name/${subAccount}`)
      .then(({ data }) => {
        console.log(data);
        setUtilityLookups(createLookupOptions(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMarketingLookups = async (subAccount) => {
    await axios
      .get(`${baseUrl}/lookups/name/${subAccount}`)
      .then(({ data }) => {
        console.log(data);
        setMarketingLookups(createLookupOptions(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAdminLookups = async (subAccount) => {
    await axios
      .get(`${baseUrl}/lookups/name/${subAccount}`)
      .then(({ data }) => {
        console.log(data);
        setAdminLookups(createLookupOptions(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getServiceLookups = async (subAccount) => {
    await axios
      .get(`${baseUrl}/lookups/name/${subAccount}`)
      .then(({ data }) => {
        console.log("papi =>>>");
        console.log(data);
        setServiceLookups(createLookupOptions(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMiscellaneousIncomeLookups = async (subAccount) => {
    console.log("in papi =>>>");

    await axios
      .get(`${baseUrl}/lookups/name/${subAccount}`)
      .then(({ data }) => {
        console.log("papi =>>>");
        console.log(data);
        setMiscellaneousIncomeLookups(createLookupOptions(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInventoryTransactions = async (inventoryIds) => {
    await axios
      .post(`${baseUrl}/transactions/byInventoryIds`, { inventoryIds })
      .then((response) => {
        console.log(response.data);
        setInventoryTransactions(response.data);
        setSearchData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAssetTransactions = async (assetIds) => {
    await axios
      .post(`${baseUrl}/transactions/byAssetIds`, { assetIds })
      .then((response) => {
        console.log(response.data);
        setAssetTransactions(response.data);
        setSearchData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReceivableTransactions = async () => {
    await axios
      .get(`${baseUrl}/transactions/receivables`)
      .then((response) => {
        console.log("in get receivables");
        console.log(response.data);
        setSearchData(response.data);
        setReceivableTransactions(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPayableTransactions = async () => {
    await axios
      .get(`${baseUrl}/transactions/payables`)
      .then((response) => {
        console.log("in get payables");
        console.log(response.data);
        setSearchData(response.data);
        setPayableTransactions(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLoans = async () => {
    await axios
      .get(`${baseUrl}/loans`)
      .then((response) => {
        console.log(response.data);
        // if(response.data.length != undefined)
        let loans = response.data.filter((el) => {
          return el.installments.length > 0;
        });
        setSearchData(loans);
        setLoans(loans);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLoanInstallments = async (record) => {
    record.installments.forEach((installment, index) => {
      record.installments[index].index = index;
      record.installments[index].lenderName = record.name;
      record.installments[index].loanId = record._id;
      record.installments[index].lenderId = record.lenderId;
    });
    setLoanInstallments(record.installments);
    setSearchData(record.installments);
  };

  const updateLoanInstallments = async (loanId, index, history) => {
    await axios
      .get(`${baseUrl}/loans/${loanId}`)
      .then((response) => {
        let loan = response.data;
        console.log("papaji3");
        loan.installments.splice(index, 1);
        const promises = [];
        promises.push(
          axios
            .put(`${baseUrl}/loans`, loan)
            .then((response) => {
              console.log("papaji2");
              if (loan.installments.length === 0) {
                getLoans();
                console.log("papaji1");
                history.goBack();
              } else {
                console.log("papaji");
                console.log(loan);
                getLoanInstallments(loan);
              }
            })
            .catch((err) => {
              console.log(err);
            })
        );
        return Promise.all(promises);
      })
      .catch((err) => {
        console.log(err);
      });
    return null;
  };

  const getLookups = async (subAccount) => {
    console.log("haha =>" + subAccount);
    switch (subAccount) {
      case transaction.expense.subAccount.utility:
        getUtilityLookups(subAccount);
        break;
      case transaction.expense.subAccount.marketing:
        getMarketingLookups(subAccount);
        break;
      case transaction.expense.subAccount.admin:
        getAdminLookups(subAccount);
        break;
      case transaction.income.subAccount.service:
        getServiceLookups(subAccount);
        break;
      case transaction.income.subAccount.miscellaneous:
        getMiscellaneousIncomeLookups(subAccount);
        break;
      default:
        break;
    }
  };

  const getOptions = () => {
    return {
      performanceTrackerData,
      getPerformanceTrackerData,
      dashboardData,
      getDashboardData,
      inventoryOptions,
      getInventories,
      supplierOptions,
      getSuppliers,
      assetOptions,
      getAssets,
      customerOptions,
      getCustomers,
      employeeOptions,
      getEmployees,
      subscriptionOptions,
      getSubscriptions,
      utilityLookups,
      marketingLookups,
      adminLookups,
      serviceLookups,
      miscellaneousIncomeLookups,
      getLookups,
      inventories,
      inventoryTransactions,
      getInventoryTransactions,
      assets,
      assetTransactions,
      getAssetTransactions,
      searchData,
      setSearchData,
      receivableTransactions,
      setReceivableTransactions,
      getReceivableTransactions,
      payableTransactions,
      setPayableTransactions,
      getPayableTransactions,
      lenderOptions,
      getLenders,
      loans,
      getLoans,
      getLoanInstallments,
      updateLoanInstallments,
      loanInstallments,
      // overheadValues,
      // setOverheadValues,
      // overheadRows,
      // setOverheadRows,
      scrollToTop,
      setScrollToTop,
    };
  };

  return (
    <DropDownOptionsContext.Provider value={getOptions()}>
      {props.children}
    </DropDownOptionsContext.Provider>
  );
};
export default OptionsContext;
