import css from './Loader.module.css';
import { MutatingDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className={css.Spinner}>
      <MutatingDots
        height="100"
        width="100"
        color="blue"
        secondaryColor="blue"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
