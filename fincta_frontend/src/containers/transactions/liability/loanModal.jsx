import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import CustomModal from "../modal/modal";
import { transaction } from "../../../utils/constants";

const LoanAcquire = (props) => {
  const [dropDownsLoading, setDropDownsLoading] = useState(true);
  const { lenderOptions, getLenders } = useContext(DropDownOptionsContext);

  const getDropDowns = async () => {
    if (lenderOptions.length === 0) await getLenders();
    setDropDownsLoading(false);
  };
  useEffect(() => {
    getDropDowns();
  }, []);

  const dropDowns = [
    {
      name: transaction.dropDown.loanLender,
      options: lenderOptions,
      creatable: false,
      addable: true,
    },
  ];
  console.log(props.installment ? "wow" : "how");
  return (
    <>
      <CustomModal
        dropDowns={dropDowns}
        dropDownsLoading={dropDownsLoading}
        inputTitle="Loan Amount"
        accountClass={transaction.liability.accountClass}
        subAccount={transaction.liability.subAccount.loan}
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
export default LoanAcquire;
