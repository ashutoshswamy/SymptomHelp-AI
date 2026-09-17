import { Header } from "@/components/Header";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";
import { SymptomForm } from "@/components/SymptomForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DisclaimerBanner />
      <Header />
      <main className="flex-1 px-3 sm:px-6 pb-8 sm:pb-12">
        <SymptomForm />
      </main>
      <Footer />
    </div>
  );
}
