import { useEffect } from "react";

const UsePageTitle = (dynamicPart: string) => {
  const baseTitle = "Todo";

  useEffect(() => {
    document.title = `${baseTitle} | ${dynamicPart}`;
  }, [dynamicPart]);
};

export default UsePageTitle;
