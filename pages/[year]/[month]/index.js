import React from 'react';
import { useRouter } from 'next/router';

const Month = () => {
  const router = useRouter();
  const { month } = router.query;

  return <p>Month: {month}</p>;
};

export default Month;
