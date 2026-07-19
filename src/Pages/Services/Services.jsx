import React, { Suspense } from 'react';
import ServicesCard from './ServicesCard';


const Services = ({data}) => {
    return (
        <div>
            <h1 className='flex justify-center text-4xl font-bold'>Our Services</h1>
            <p className='flex justify-center ml-8'>Our Ai-powered platform provides comprehensive solutions to help farmers to help farmers make data-driven decisions</p>
            <Suspense fallback={<span>loading....</span>}>
             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 mt-4'>
                  {
                data.map((singleCard)=><ServicesCard key={singleCard.id} singleCard={singleCard}></ServicesCard>)
               }
             </div>
             
            </Suspense>
            
        </div>
    );
};

export default Services;