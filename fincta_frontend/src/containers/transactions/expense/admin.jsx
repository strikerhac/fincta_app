import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import CustomModal from "../modal/modal";
import { transaction } from "../../../utils/constants";

const Admin = (props) => {
  const [dropDownsLoading, setDropDownsLoading] = useState(true);
  const { adminLookups, getLookups } = useContext(DropDownOptionsContext);

  const getDropDowns = async () => {
    if (adminLookups.length === 0)
      await getLookups(transaction.expense.subAccount.admin);
    setDropDownsLoading(false);
  };
  useEffect(() => {
    getDropDowns();
  }, []);

  const dropDowns = [
    {
      name: transaction.dropDown.admin,
      options: adminLookups,
      creatable: true,
      addable: false,
    },
  ];

  return (
    <>
      <CustomModal
        dropDowns={dropDowns}
        dropDownsLoading={dropDownsLoading}
        setDropDownsLoading={setDropDownsLoading}
        inputTitle="Admin Expense Amount"
        pay
        accountClass={transaction.expense.accountClass}
        subAccount={transaction.expense.subAccount.admin}
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
export default Admin;
