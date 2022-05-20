import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import CustomModal from "../modal/modal";
import { transaction } from "../../../utils/constants";

const Marketing = (props) => {
  const [dropDownsLoading, setDropDownsLoading] = useState(true);
  const { marketingLookups, getLookups, supplierOptions, getSuppliers } =
    useContext(DropDownOptionsContext);

  const getDropDowns = async () => {
    if (marketingLookups.length === 0)
      await getLookups(transaction.expense.subAccount.marketing);
    if (supplierOptions.length === 0) await getSuppliers();
    setDropDownsLoading(false);
  };
  useEffect(() => {
    getDropDowns();
  }, []);

  const dropDowns = [
    {
      name: transaction.dropDown.marketing,
      options: marketingLookups,
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
        inputTitle="Marketing Amount"
        pay
        accountClass={transaction.expense.accountClass}
        subAccount={transaction.expense.subAccount.marketing}
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
export default Marketing;
