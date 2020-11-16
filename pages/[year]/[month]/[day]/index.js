import { useRouter } from 'next/router';

const Day = () => {
  const router = useRouter();
  const { day } = router.query;

  return <p>Day: {day}</p>;
};

export default Day;
