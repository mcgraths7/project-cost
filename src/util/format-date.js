import moment from 'moment';
const formatDate = (dateString) => {
  return moment(dateString).format('MMM Do YYYY, h:mm:ss a');
};

export default formatDate;
