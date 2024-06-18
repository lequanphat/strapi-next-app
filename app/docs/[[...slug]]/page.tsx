import { notFound } from 'next/navigation';
import React from 'react';

const DetailedDocPage = ({ params }: { params: { slug: string[] } }) => {
  if (params.slug?.length === 2) {
    return (
      <div>
        <h1>
          Slug: {params.slug[0]} - {params.slug[1]}
        </h1>
      </div>
    );
  } else if (params.slug?.length === 1) {
    return (
      <div>
        <h1>Slug: {params.slug[0]}</h1>
      </div>
    );
  } else if (params.slug?.length > 2) {
    notFound();
  } else {
    return (
      <div>
        <h1>This is docs page</h1>
      </div>
    );
  }
};

export default DetailedDocPage;
