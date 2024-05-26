import {Card, CardContent, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Image from 'next/image'
const Page = () => {
  return (
    <div className="container mx-auto py-12 px-0">
      <h1 className="text-4xl font-bold mb-8 text-center">Про нас</h1>
      <div className="flex flex-col items-center mb-12">
        <Image src="/aboutUs.webp" alt="Наше фото" width={600} height={400} className="rounded-lg shadow-lg h-[400px]"/>
        <p className="mt-4 text-lg text-center max-w-2xl">
          Оптимізуйте енергоспоживання ваших пристроїв з нашою інформаційною системою - точні розрахунки та інтуїтивний інтерфейс для підвищення енергоефективності.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="animate-fadeInUp">
          <CardContent className='p-3'>
            <CardTitle>Наша історія</CardTitle>
            <p>Ми почали як невелика група ентузіастів, що прагнули змінити світ на краще шляхом впровадження
              енергоефективних рішень.</p>
          </CardContent>
        </Card>
        <Card className="animate-fadeInUp">
          <CardContent className='p-3'>
            <CardTitle>Наша команда</CardTitle>
            <p>Наша команда складається з експертів в галузі енергетики, програмування та аналітики даних.</p>
          </CardContent>
        </Card>
        <Card className="animate-fadeInUp">
          <CardContent className='p-3'>
            <CardTitle>Наші цінності</CardTitle>
            <p>Ми віримо в сталий розвиток, прозорість та інновації як ключові чинники для досягнення нашої мети.</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <Card className="animate-fadeInUp">
          <CardContent className='p-3'>
            <CardTitle>Наші досягнення</CardTitle>
            <p>За останні роки ми допомогли зекономити тисячі мегават-годин енергії для наших користувачів.</p>
          </CardContent>
        </Card>
        <Card className="animate-fadeInUp">
          <CardContent className='p-3'>
            <CardTitle>Наші проекти</CardTitle>
            <p>Ми працюємо над різноманітними проектами, від освітніх програм до технологічних інновацій у сфері
              енергоефективності.</p>
          </CardContent>
        </Card>
        <Card className="animate-fadeInUp">
          <CardContent className='p-3'>
            <CardTitle>Контакт з нами</CardTitle>
            <p>Ми завжди відкриті для нових ідей та співпраці. Зв'яжіться з нами для обговорення можливостей
              співпраці.</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Експорт результатів розрахунків</h2>
        <p className="mb-8 max-w-lg mx-auto">Експортуйте результати ваших розрахунків у зручному форматі для подальшого
          використання та аналізу.</p>
        <div className="flex justify-center space-x-4 flex-wrap gap-3">
          <Button className="export-button">Експорт до DOCX</Button>
          <Button className="export-button">Експорт до Excel</Button>
          <Button className="export-button">Експорт до PDF</Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
