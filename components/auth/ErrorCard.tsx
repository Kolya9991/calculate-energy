import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import Header from "@/components/auth/Header";
import BackButton from "@/components/auth/BackButton";

const ErrorCard = () => {
  return (
    <Card className='w-[400px] shadow-md'>
      <CardHeader>
        <Header label="Сталась помилка"/>
      </CardHeader>
      <CardFooter>
        <BackButton label="Повернутись назад" href="/auth/login"/>
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;