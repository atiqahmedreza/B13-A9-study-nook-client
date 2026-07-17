import { Helmet } from 'react-helmet-async';
import { PAGE_TITLES } from '../constants';

const PageTitle = ({ title, path, description }) => {
  const resolved =
    title || PAGE_TITLES[path] || 'StudyNook – Library Study Room Booking';

  return (
    <Helmet>
      <title>{resolved}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

export default PageTitle;
