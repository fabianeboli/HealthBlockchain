import React, { createContext, Context, useState, FC } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface Props {
  children: React.ReactNode;
}

export interface Signed {
  index: string;
  changeIndex: (index: string) => void;
}

export const PatientIndexContext: Context<Signed> = createContext<Signed>({
  index: "",
  changeIndex: () => {},
});

export const PatientIndexProvider: FC<Props> = (props: Props) => {
  const [index, setIndex] = useLocalStorage("index", "");
  const changeIndex = (index: string) => setIndex(index);
  return (
    <PatientIndexContext.Provider value={{ index , changeIndex }}>
      {props.children}
    </PatientIndexContext.Provider>
  );
};
