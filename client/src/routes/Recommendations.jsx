import React, { useState } from 'react';

export default function Recommendations() {
  const [recommend, setRecommend] = useState("");
  return (
    <>
    <div className='recommend'>
      <input type="text" id="recommend-search" name='recommend' placeholder='Search to get recommended books' />
      <button type='submit' id='search-button'>Submit</button>
    </div>
      
    </>
  )
}
