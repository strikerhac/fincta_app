import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import CustomModal from "../modal/modal";
import { transaction } from "../../../utils/constants";

const AssetSale = (props) => {
  const [dropDownsLoading, setDropDownsLoading] = useState(true);
  const { assetOptions, getAssets, customerOptions, getCustomers } = useContext(
    DropDownOptionsContext
  );

  const getDropDowns = async () => {
    if (assetOptions.length === 0) await getAssets();
    if (customerOptions.length === 0) await getCustomers();
    setDropDownsLoading(false);
  };
  useEffect(() => {
    getDropDowns();
  }, []);

  const dropDowns = [
    {
      name: transaction.dropDown.asset,
      options: assetOptions,
      creatable: false,
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
        counterTitle="Sale Quantity"
        inputTitle="Sale Amount"
        pay={false}
        accountClass={transaction.income.accountClass}
        subAccount={transaction.income.subAccount.assetSale}
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
export default AssetSale;
