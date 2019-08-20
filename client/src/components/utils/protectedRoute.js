import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Spinner from './utils/spinner'

import ContextWrapper from './utils/ContextWrapper'

const ProtectedRoute = ({ component: Component, isAuth, path, ...rest }) => {

    return (
  
      <Route
        path={path}
        {...rest}
        render={props => {
          return props.isAuth == null ? 

            <Spinner />
            
            :

             props.isAuth === false ? <Redirect />
            
            : 

           <Component { ...props } />
          
            

          
        }}
      />
    );
  };
  

  export default ContextWrapper(ProtectedRoute)