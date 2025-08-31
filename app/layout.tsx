import type { Metadata } from "next";
import { ReactTempus } from "tempus/react";

import { GSAPRuntime } from "@/components/gsap/runtime";
import { StoreProvider } from "@/libs/store";
import { WindowEventsProvider } from "@/libs/events";
import { Grid } from "@/components/grid";
import { Stats } from "@/components/stats";
import { Preloader } from "@/components/preloader";
import { Transition } from "@/components/transition";
import { Navigation } from "@/app/(pages)/(components)/navigation";
import { ScrollContainer } from "@/app/(pages)/(components)/scroll-container";

import "../styles/global.scss";

export const metadata: Metadata = {
  title: "Next Starter",
  description: "Next Starter",
  icons: {
    icon: [
      {
        url: "/icons/favicon.ico",
        type: "image/ico",
        sizes: "256x256",
      },
    ],
    apple: [{ url: "/icons/favicon.ico", sizes: "256x256" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WindowEventsProvider>
          <StoreProvider>
            <GSAPRuntime />
            <Preloader />
            <Navigation />
            <ScrollContainer>
              <Transition>{children}</Transition>
            </ScrollContainer>
            <ReactTempus patch />
            <Grid />
            <Stats />
          </StoreProvider>
        </WindowEventsProvider>
      </body>
    </html>
  );
}
