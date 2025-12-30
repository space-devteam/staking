import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is MyToken?",
    answer: "MyToken is a utility token built on the Ethereum blockchain, designed to revolutionize the digital economy by enabling secure, fast, and transparent transactions.",
  },
  {
    question: "How can I participate in the presale?",
    answer: "To participate in the presale, connect your wallet to our platform, select the amount of tokens you wish to purchase, and complete the transaction. Early backers receive exclusive bonuses!",
  },
  {
    question: "What is the total supply of MyToken?",
    answer: "The total supply of MyToken is 1,000,000,000 tokens. A portion of these tokens is allocated for the presale, partnerships, and community rewards.",
  },
  {
    question: "How is MyToken secured?",
    answer: "MyToken is built on the Ethereum blockchain, which is one of the most secure and decentralized networks. Additionally, our smart contracts have been audited by leading security firms.",
  },
  {
    question: "Can I stake MyToken?",
    answer: "Yes, you can stake MyToken to earn rewards. Staking helps secure the network and provides passive income opportunities for token holders.",
  },
  {
    question: "What are the use cases for MyToken?",
    answer: "MyToken can be used for payments, staking, governance, and accessing exclusive platform features. It’s designed to empower users and drive adoption in the crypto ecosystem.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className=" py-24 sm:py-32 mx-auto px-4 md:px-8 bg-purple-100 relative bg-no-repeat bg-cover z-0 bg-center" style={{ backgroundImage: 'url(/images/bg.jpg)' }}>
    <div className="bg-purple-100 relative bg-no-repeat bg-cover z-0 bg-center" style={{ backgroundImage: 'url(/images/bg.jpg)' }}>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Find answers to common questions about MyToken, the presale, and the project. If you have additional questions, feel free to contact us.
        </p>
      </div>

      {/* Accordion for FAQs */}
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqData.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors duration-200">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm mt-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
