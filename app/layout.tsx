import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/AppLayout";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PlayerListContextProvider } from "@/context/PlayerListContext";
import { Toaster } from "@/components/ui/toaster";
import { AddPlayerDrawerContextProvider } from "@/context/AddPlayerDrawerContext";
import { CreateTeamSettingsContextProvider } from "@/context/CreateTeamSettingContext";
import { HomeContextProvider } from "@/context/HomeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background`} >
        <HomeContextProvider>
          <CreateTeamSettingsContextProvider>
            <PlayerListContextProvider>
              <AddPlayerDrawerContextProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  <AppLayout>
                    {children}
                  </AppLayout>
                  <Toaster />
                </ThemeProvider>
              </AddPlayerDrawerContextProvider>
            </PlayerListContextProvider>
          </CreateTeamSettingsContextProvider>
        </HomeContextProvider>
      </body>
    </html>
  );
}
