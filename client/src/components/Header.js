import React from 'react';

const Header = ({ user }) => {
  const totalCalc = user.shareValues.reduce(
    (runningTotal, shareValues) =>
      (runningTotal += shareValues.currentMarketValue * shareValues.numshares),
    0
  );

  return (
    <>
      <p>Username: {user.name}</p>
      <p>Current Portfolio Total: £{totalCalc}</p>
    </>
  );
};

export default Header;
