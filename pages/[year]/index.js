import React from 'react';
import { useRouter } from 'next/router';

const Year = () => {
  const router = useRouter();
  const { year } = router.query;

  return <p>Year: {year}</p>;
};

export default Year;
