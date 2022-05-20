import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../../context/optionsContext";
import CustomModal from "./productSale";
import { transaction } from "../../../../utils/constants";

const ProductSale = (props) => {
  const [dropDownsLoading, setDropDownsLoading] = useState(true);
  const {
    inventories,
    inventoryOptions,
    getInventories,
    customerOptions,
    getCustomers,
  } = useContext(DropDownOptionsContext);

  const getDropDowns = async () => {
    if (inventoryOptions.length === 0) await getInventories();
    if (customerOptions.length === 0) await getCustomers();
    setDropDownsLoading(false);
  };
  useEffect(() => {
    getDropDowns();
  }, []);

  const dropDowns = [
    {
      name: transaction.dropDown.inventory,
      options: inventoryOptions,
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
        inventories={inventories}
        dropDowns={dropDowns}
        dropDownsLoading={dropDownsLoading}
        counterTitle="Sale Quantity"
        inputTitle="Sale Amount"
        accountClass={transaction.income.accountClass}
        subAccount={transaction.income.subAccount.productSale}
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
export default ProductSale;
