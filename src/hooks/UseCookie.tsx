import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

//NOTE: could not assert cookie type, cannot cast string to any generic T
export default function useCookie({ key, checkEvery, initValue }: { key?: string, checkEvery?: number, initValue?: any }
): [any, (val: any) => void] {
  const [cookieState, setCookieState] = useState<any>(initValue!);

  const setVal = useCallback((val: any) => {
    Cookies.set(key!, val as string, { expires: 1 });
    setCookieState(val);
  }, [key]);

  useEffect(() => {
    setInterval(() => {
      const currCookie = Cookies.get(key ?? "");
      setCookieState(currCookie);
    }, checkEvery ?? 300000);

    const currCookie = Cookies.get(key ?? "");
    if (currCookie) {
      setCookieState(currCookie);
    }
  }, []);

  return [cookieState, setVal];
};