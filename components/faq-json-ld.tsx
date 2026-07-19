import { JsonLd } from "@/components/json-ld";
import { absUrl } from "@/lib/url";

type Faq = { question: string; answer: string };

export function FaqJsonLd({ path, faqs }: { path: string; faqs: Faq[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
        url: absUrl(path),
      }}
    />
  );
}
