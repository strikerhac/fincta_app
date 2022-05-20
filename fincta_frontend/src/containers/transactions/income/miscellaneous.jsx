import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import CustomModal from "../modal/modal";
import { transaction } from "../../../utils/constants";

const Misellaneous = (props) => {
  const [dropDownsLoading, setDropDownsLoading] = useState(true);
  const {
    miscellaneousIncomeLookups,
    getLookups,
    customerOptions,
    getCustomers,
  } = useContext(DropDownOptionsContext);

  const getDropDowns = async () => {
    if (miscellaneousIncomeLookups.length === 0)
      await getLookups(transaction.income.subAccount.miscellaneous);
    if (customerOptions.length === 0) await getCustomers();
    setDropDownsLoading(false);
  };
  useEffect(() => {
    getDropDowns();
  }, []);

  const dropDowns = [
    {
      name: transaction.dropDown.incomeType,
      options: miscellaneousIncomeLookups,
      creatable: true,
      addable: false,
    },
    {
      name: transaction.dropDown.customer,
      options: customerOptions,
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
        inputTitle="Amount"
        pay={false}
        accountClass={transaction.income.accountClass}
        subAccount={transaction.income.subAccount.miscellaneous}
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
export default Misellaneous;
