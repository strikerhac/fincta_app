import React, { useState, useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../../context/optionsContext";
import CustomModal from "../modal/modal";
import { transaction } from "../../../utils/constants";

const Salary = (props) => {
  const [dropDownsLoading, setDropDownsLoading] = useState(true);
  const { employeeOptions, getEmployees } = useContext(DropDownOptionsContext);

  const getDropDowns = async () => {
    if (employeeOptions.length === 0) await getEmployees();
    setDropDownsLoading(false);
  };
  useEffect(() => {
    getDropDowns();
  }, []);

  const dropDowns = [
    {
      name: transaction.dropDown.employee,
      options: employeeOptions,
      creatable: false,
      addable: true,
    },
  ];

  return (
    <>
      <CustomModal
        dropDowns={dropDowns}
        dropDownsLoading={dropDownsLoading}
        inputTitle="Salary for the Month"
        pay
        accountClass={transaction.expense.accountClass}
        subAccount={transaction.expense.subAccount.salary}
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
export default Salary;
