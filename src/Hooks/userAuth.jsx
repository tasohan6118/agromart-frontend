import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';

const userAuth = () => {
   const authInfo=use(AuthContext)
   return authInfo;
};

export default userAuth;
