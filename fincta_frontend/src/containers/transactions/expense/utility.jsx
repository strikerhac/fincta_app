import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import CustomModal from "../modal/modal";
import { transaction } from "../../../utils/constants";

const Utility = (props) => {
  const [dropDownsLoading, setDropDownsLoading] = useState(true);
  const { utilityLookups, getLookups, supplierOptions, getSuppliers } =
    useContext(DropDownOptionsContext);

  const getDropDowns = async () => {
    if (utilityLookups.length === 0)
      await getLookups(transaction.expense.subAccount.utility);
    if (supplierOptions.length === 0) await getSuppliers();
    setDropDownsLoading(false);
  };
  useEffect(() => {
    getDropDowns();
  }, []);

  const dropDowns = [
    {
      name: transaction.dropDown.utility,
      options: utilityLookups,
      creatable: true,
      addable: false,
    },
    {
      name: transaction.dropDown.supplier,
      options: supplierOptions,
      creatable: false,
      addable: true,
    },
  ];
  return (
    <>
      <CustomModal
        dropDowns={dropDowns}
        dropDownsLoading={dropDownsLoading}
        setDropDownsLoading={setDropDownsLoading}
        inputTitle="Utility Amount"
        pay
        accountClass={transaction.expense.accountClass}
        subAccount={transaction.expense.subAccount.utility}
        close={props.close}
        visible={props.visible}
        setVisible={props.setVisible}
        setSecondModal={props.setSecondModal}
        visibleSecondModal={props.visibleSecondModal}
        setVisibleSecondModal={props.setVisibleSecondModal}
      />
    </>
  );
};
export default Utility;
