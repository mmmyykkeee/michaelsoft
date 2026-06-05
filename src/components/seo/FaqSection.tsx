import JsonLd from "./JsonLd";
import { faqPageSchema, type FaqItem } from "@/lib/seo/faq";

type FaqSectionProps = {
  title?: string;
  faqs: FaqItem[];
};

export default function FaqSection({ title = "Frequently asked questions", faqs }: FaqSectionProps) {
  return (
    <section className="mt-16 border-t border-white/10 pt-12" aria-labelledby="faq-heading">
      <JsonLd data={faqPageSchema(faqs)} />
      <h2 id="faq-heading" className="font-headline text-xl font-bold text-white mb-8 tracking-wide">
        {title}
      </h2>
      <dl className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <dt className="font-headline text-sm font-bold text-white mb-2">{faq.question}</dt>
            <dd className="text-sm text-slate-400 leading-relaxed">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
