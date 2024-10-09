import React, { useState } from 'react';
import AuthBox from '../../components/auth/AuthBox';
import AuthContainer from '../../components/auth/AuthContainer';
import AuthHeader from '../../components/auth/AuthHeader';

const Auth: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  return (
    <AuthContainer>
      <AuthBox isRegister={isRegister} setIsRegister={setIsRegister}>
        <AuthHeader />
      </AuthBox>
    </AuthContainer>
  );
};

export default Auth;
