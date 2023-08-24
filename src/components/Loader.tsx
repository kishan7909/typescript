import React, { useState } from "react";
import { Alert, Spin } from "antd";

import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';



const Spinner = () => {
  const spinnerClasses = classNames('flex items-center animate-spin justify-center', {
    'pointer-events-none': true,
  });
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 z-50">
      <div className={spinnerClasses}>
        <div className="flex w-8 h-8 relative">
          <div className="w-3 h-3 m-0 rounded-full bg-f7771c absolute top-0 left-0" />
          <div
            className="w-3 h-3 m-0 rounded-full bg-f7771c absolute top-0 right-0"
            style={{ animationDelay: '0.33s' }}
          />
          <div
            className="w-3 h-3 m-0 rounded-full bg-f7771c absolute bottom-0 right-0 "
            style={{ animationDelay: '0.66s' }}
          />
          <div
            className="w-3 h-3 m-0 rounded-full bg-f7771c absolute bottom-0 left-0 "
            style={{ animationDelay: '1s' }}
          />
        </div>
      </div>

    </div>
  );
};

const Loader: React.FC = ({ children, loading }: any) => {
  return (
    <div>
      {loading && <Spinner />}
      {children}
    </div>
  );
};

export default Loader;
