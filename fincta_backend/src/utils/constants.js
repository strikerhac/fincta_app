const constants = {
  loanFlag: {
    installmentPayment: 0,
    loanAcquisition: 1,
  },
  receivableFlag: {
    received: 0,
    receivable: 1,
    receivedTransaction: 2,
    zeroReceivable: 3,
  },
  payableFlag: {
    paid: 0,
    payable: 1,
    paidTransaction: 2,
    zeroPayable: 3,
  },
  dropDown: {
    asset: "Asset",
    supplier: "Supplier",
    admin: "Admin Expense",
    inventory: "Inventory",
    marketing: "Marketing Type",
    employee: "Employee",
    utility: "Utility",
    customer: "Customer",
    incomeType: "Income Type",
    service: "Service",
    liability: "Liability",
    subscription: "Subscription",
    loanLender: "Lender",
  },
  asset: {
    accountClass: "Asset",
    subAccount: {
      inventory: "Inventory",
      software: "Software Development",
      fixed: "Fixed Assets",
      receivable: "Receivable",
      miscellaneous: "Miscellaneous",
    },
  },
  expense: {
    accountClass: "Expense",
    subAccount: {
      utility: "Utility Expense",
      marketing: "Ads & Marketing",
      admin: "Admin Expenses",
      salary: "Salaries",
      inventoryDamage: "Inventory Damage",
      inventoryPurchase: "Inventory Purchase",
      assetPurchase: "Asset Purchase",
      refund: "Refund",
      financeCost: "Finance Cost",
      researchAndDevelopment: "Research & Development",
      rentPayment: "Rent Payment",
      assetDepreciation: "Asset Depreciation",
      businessEntertainment: "Business Entertainment",
      miscellaneous: "Miscellaneous",
    },
  },
  income: {
    accountClass: "Income",
    subAccount: {
      productSale: "Product Sale",
      service: "Service",
      assetSale: "Asset Sale",
      subscription: "Subscription",
      miscellaneous: "Miscellaneous",
      rentReceived: "Rent Received",
    },
  },
  liability: {
    accountClass: "Liability",
    subAccount: {
      loan: "Loans",
      payable: "Payables",
      miscellaneous: "Miscellaneous",
    },
  },
  equity: {
    accountClass: "Equity",
    subAccount: {
      capitalInvested: "Capital Invested",
      withdrawl: "Withdrawl",
      personalExpense: "Personal Expense",
    },
  },
};

export default constants;
