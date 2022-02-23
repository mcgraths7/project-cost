const formatTitle = (title) => {
  return title.length > 35 ? title.slice(0, 35).concat('...') : title;
};

export default formatTitle;
