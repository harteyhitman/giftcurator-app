import { ChatAgent, SupportContactCards, Faq, CallMeBack } from '@/components/support';

export default function SupportPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Support</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <ChatAgent />
        </div>
        <div>
          <SupportContactCards />
        </div>
      </div>
      <div>
        <h2 className="my-4 text-2xl font-bold text-center">Frequently Asked Questions</h2>
        <Faq />
      </div>
      <CallMeBack />
    </div>
  );
}
