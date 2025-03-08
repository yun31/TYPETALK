import type { Metadata } from "next";
import Header from "@/src/app/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "TYPETALK - MBTI 대화 서비스",
  description: "다양한 MBTI 성격 유형과 대화를 나눠보세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
