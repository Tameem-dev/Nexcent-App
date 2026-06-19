import React from 'react';
import { 
  Client, 
  Community, 
  Unseen, 
  Helping, 
  Design, 
  Insights, 
  Testimonial, 
  Marketing,
  SubFooter,
} from '../../component';

const Homepage = () => {
  return (
    <div>
      <Insights />
      <Client />
      <Community />
      <Unseen />
      <Helping />
      <Design />
      <Testimonial />
      <Marketing />
      <SubFooter />
    </div>
  );
};

export default Homepage;