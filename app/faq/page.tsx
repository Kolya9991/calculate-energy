import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const FaqPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Часті питання (FAQ)</h1>
      <p className="text-lg text-center mb-8 max-w-2xl mx-auto">
        Тут ви знайдете відповіді на найбільш поширені питання щодо енергоефективності та наших інструментів розрахунку.
      </p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">Як розраховується енергоефективність?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Енергоефективність розраховується шляхом порівняння енергії, спожитої для виконання певної роботи, з енергією, яку можна було б зекономити за рахунок використання більш ефективних технологій чи методів.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">Що таке енергоефективність?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Енергоефективність - це здатність використовувати менше енергії для виконання тієї ж роботи або отримання тих самих результатів. Це може включати використання більш ефективних приладів, вдосконалення ізоляції будівель або впровадження енергоефективних практик.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">Які переваги енергоефективності?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Переваги енергоефективності включають зниження енергоспоживання, економію коштів, зменшення викидів парникових газів та підвищення комфорту в будівлях.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">Як можна підвищити енергоефективність вдома?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Ви можете підвищити енергоефективність вдома, замінивши старі прилади на енергоефективні моделі, поліпшивши ізоляцію, встановивши енергоефективні вікна та двері, а також використовуючи розумні термостати.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">Що таке сертифікація енергоефективності?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Сертифікація енергоефективності - це процес оцінки будівлі чи приладу з метою визначення рівня його енергоефективності. Вона допомагає споживачам робити обґрунтовані рішення про придбання.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">Чому важливо знижувати енергоспоживання?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Зниження енергоспоживання важливо для зменшення впливу на навколишнє середовище, економії коштів та зменшення залежності від невідновлюваних джерел енергії.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">Які технології допомагають підвищити енергоефективність?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Серед технологій, що допомагають підвищити енергоефективність, можна виділити світлодіодне освітлення, теплоізоляційні матеріали, розумні термостати, енергоефективні прилади та відновлювані джерела енергії.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-8" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">Як відновлювані джерела енергії впливають на енергоефективність?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Відновлювані джерела енергії, такі як сонячна та вітрова енергія, допомагають знизити залежність від традиційних енергоносіїв та сприяють більшій енергоефективності завдяки своїй відновлюваній природі.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-9" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">Як бізнеси можуть підвищити свою енергоефективність?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Бізнеси можуть підвищити енергоефективність, впроваджуючи енергоефективні технології, оптимізуючи процеси виробництва, використовуючи відновлювані джерела енергії та проводячи енергетичні аудити.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-10" className="border-b">
          <AccordionTrigger className="text-lg font-medium py-4">Які фінансові стимули існують для підвищення енергоефективності?</AccordionTrigger>
          <AccordionContent className="pb-4">
            Багато урядів та організацій надають фінансові стимули, такі як податкові кредити, гранти та субсидії, для заохочення підвищення енергоефективності в будинках та підприємствах.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FaqPage;
