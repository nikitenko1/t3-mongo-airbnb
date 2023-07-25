import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ClientOnly } from "@/components";
import NextNProgress from "nextjs-progressbar";
import {
  LoginModal,
  RegisterModal,
  RentModal,
  SearchModal,
} from "@/components/modals";
import { Navbar } from "@/components/navbar";
import { Toaster } from "react-hot-toast";

const nextProgressOptions = {
  color: "#fbbf24",
  showOnShallow: true,
  options: {
    showSpinner: false,
  },
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ClientOnly>
        <NextNProgress {...nextProgressOptions} />
        <Toaster position="top-center" />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <SearchModal />
        <Navbar />
      </ClientOnly>
      <Component {...pageProps} />v
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
