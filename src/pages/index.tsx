import React from 'react';
import Menu from '@/components/composto/menu';
import Cabersalho from '@/components/basicos/cabersalho'


function Home() {
  return (
    <div className={`flex min-h-screen flex-col items-center bg-white`}>
      <Cabersalho />
      <Menu />
    
    </div>
  );
}

export default Home;