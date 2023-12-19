import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { isLoadingState } from "../state/is-loading-state";

export function useLoadingScreen() {
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  // const [isLoadingPriorityValue, setIsLoadingPriority] = useRecoilState(isLoadingPriority);

  const showLoading = useCallback(() => {
    setIsLoading(true);
  }, [isLoading]);

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, [isLoading]);

  return {
    isLoading,
    showLoading,
    hideLoading,
  };
}
// export function useLoadingScreen() {
//   const [isLoadingValue, setIsLoading] = useRecoilState(isLoading);
//   const [isLoadingPriorityValue, setIsLoadingPriority] = useRecoilState(isLoadingPriority);

//   const showLoading = useCallback((priority = 0) => {
//     setIsLoading(true);

//     if (priority > isLoadingPriorityValue) {
//       setIsLoadingPriority(priority);
//     }
//   }, [isLoadingPriorityValue, setIsLoading, setIsLoadingPriority])

//   const hideLoading = useCallback((priority = 0) => {
//     if (priority < isLoadingPriorityValue) {
//       return;
//     }

//     setIsLoading(false);
//     setIsLoadingPriority(0);
//   }, [isLoadingPriorityValue, setIsLoading, setIsLoadingPriority]);

//   return {
//     isLoading: isLoadingValue,
//     isLoadingPriority: isLoadingPriorityValue,
//     showLoading,
//     hideLoading,
//   };
// }
