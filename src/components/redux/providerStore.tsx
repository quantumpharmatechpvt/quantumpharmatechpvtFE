"use client";
import { Provider as ReactProvider } from "react-redux";
import { store } from "./store";

export default function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReactProvider store={store}>{children}</ReactProvider>;
}
