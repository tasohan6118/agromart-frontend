import React from 'react';

const ServicesCard = ({singleCard}) => {

    const  {image,Title,Description}=singleCard
   
    return (
        <div>
            {/* card */}
            <div className="card bg-base-200 w-90 shadow-sm hover:shadow-lg transition">
  <figure>
    <img className='w-24 h-20'
      src={image}
      alt={Title} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
    <div className='text-center'>
          <h1 className='text-center'>{Title}</h1>
    </div>
   
    </h2>
    <p>{Description}</p>
    <div className="card-actions justify-end">
    </div>
  </div>
</div>
        </div>
    );
};

export default ServicesCard;