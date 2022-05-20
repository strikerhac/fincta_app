import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import CustomModal from "../modal/modal";
import { transaction } from "../../../utils/constants";
import { OmitProps } from "antd/lib/transfer/ListBody";

const InstallmentModal = (props) => {
  const [dropDownsLoading, setDropDownsLoading] = useState(true);
  useEffect(() => {
    console.log(props.hasOwnProperty("installment") ? "wow" : "how");
  }, []);

  return (
    <>
      <CustomModal
        dropDownsLoading={dropDownsLoading}
        inputTitle="Installment Amount"
        index={props.index}
        loanId={props.loanId}
        lenderId={props.lenderId}
        installment
        lenderName={props.lenderName}
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
export default InstallmentModal;
