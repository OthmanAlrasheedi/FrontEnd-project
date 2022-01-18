import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';

const ProgressBar = ({ file, setFile ,setimg}) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      console.log("url :" ,url);
      setFile(null);
      setimg(url)
    }
  }, [url, setFile]);

  return (
    <motion.div className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
} 

export default ProgressBar;