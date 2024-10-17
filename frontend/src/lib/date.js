export const formatPostDate = (isoDate) => {
    const timestamp = Date.parse(isoDate);
    
    if (isNaN(timestamp)) {
      return 'Invalid Date';
    }
  
    const date = new Date(timestamp);
    const options = { day: 'numeric', month: 'long' };
    return ` ${date.toLocaleDateString('en-GB', options)}`;
  };

export const formatCreateAt = (isoDate) => {
  const timestamp = Date.parse(isoDate);
  
  if (isNaN(timestamp)) {
    return 'Invalid Date';
  }

  const date = new Date(timestamp);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return ` ${date.toLocaleDateString('en-GB', options)}`;
};