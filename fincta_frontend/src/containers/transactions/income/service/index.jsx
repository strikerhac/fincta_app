import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../../context/optionsContext";
import CustomModal from "./service";
import { transaction } from "../../../../utils/constants";

const Service = (props) => {
  const [dropDownsLoading, setDropDownsLoading] = useState(true);
  const { serviceLookups, getLookups, customerOptions, getCustomers } =
    useContext(DropDownOptionsContext);

  const getDropDowns = async () => {
    if (serviceLookups.length === 0)
      await getLookups(transaction.income.subAccount.service);
    if (customerOptions.length === 0) await getCustomers();
    setDropDownsLoading(false);
  };
  useEffect(() => {
    getDropDowns();
  }, []);

  const dropDowns = [
    {
      name: transaction.dropDown.service,
      options: serviceLookups,
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
        inputTitle="Service Charge"
        accountClass={transaction.income.accountClass}
        subAccount={transaction.income.subAccount.service}
        close={props.close}
        visible={props.visible}
        setVisible={props.setVisible}
        setSecondModal={props.setSecondModal}
        setVisibleSecondModal={props.setVisibleSecondModal}
      />
    </>
  );
};
export default Service;
