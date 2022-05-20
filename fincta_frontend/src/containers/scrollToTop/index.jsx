import { useEffect, useContext } from "react";
import { DropDownOptionsContext } from "../../context/optionsContext";

const Index = () => {
  const { scrollToTop } = useContext(DropDownOptionsContext);
  useEffect(() => {
    console.log("in scroll");
    document.documentElement.scrollTo(0, 0);
    // window.scrollTo(0, 0);
  }, [scrollToTop]);
  return null;
};
export default Index;
