import Header from '../components/Header';

const BaseLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen min-w-[368px]'>
      <Header />
      <div className='container mx-auto p-6 h-full w-full max-w-[1536px] flex-grow flex'>
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
