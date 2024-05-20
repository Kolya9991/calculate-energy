import ContactsInfo from "@/components/contacts/ContactsInfo";
import ContactUsForm from "@/components/contacts/ContactUsForm";

const Page = () => {
  return (
    <div>
      <h3 className='text-3xl flex justify-center font-bold mt-8 mb-8'>Контактна інформація</h3>
      <div className='flex max-w-[840px] mx-auto gap-2 flex-wrap'>
        <ContactsInfo />
        <ContactUsForm />
      </div>
    </div>
  );
};

export default Page;
