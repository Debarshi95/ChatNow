import React from 'react';
import { makeClasses } from '../../utils';

const SubmittingButton = ({ isSubmitting, disabled }) => {
  return (
    <button
      className={makeClasses(
        'bg-slate-600 flex-1',
        'hover:bg-slate-700 text-white font-bold py-2 px-4',
        'rounded focus:outline-none focus:shadow-outline mb-5',
        'disabled:bg-slate-400'
      )}
      type="submit"
      disabled={disabled}
    >
      {isSubmitting ? 'Submitting...' : 'Sign In'}
    </button>
  );
};

export default SubmittingButton;
