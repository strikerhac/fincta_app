import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import CustomModal from "../modal/modal";
import { transaction } from "../../../utils/constants";

const Subscription = (props) => {
  const [dropDownsLoading, setDropDownsLoading] = useState(true);
  const {
    subscriptionOptions,
    getSubscriptions,
    customerOptions,
    getCustomers,
  } = useContext(DropDownOptionsContext);

  const getDropDowns = async () => {
    if (subscriptionOptions.length === 0) await getSubscriptions();
    if (customerOptions.length === 0) await getCustomers();
    setDropDownsLoading(false);
  };
  useEffect(() => {
    getDropDowns();
  }, []);

  const dropDowns = [
    {
      name: transaction.dropDown.subscription,
      options: subscriptionOptions,
      creatable: false,
      addable: true,
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
        inputTitle="Subscription Charge"
        pay={false}
        accountClass={transaction.income.accountClass}
        subAccount={transaction.income.subAccount.subscription}
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
export default Subscription;
