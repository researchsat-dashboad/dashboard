import Header from '../components/Header';

const BaseLayout = ({ children, headerProps }) => {
  return (
    <div className='flex flex-col min-h-screen min-w-[368px] max-h-[100dvh]'>
      <Header {...headerProps} />
      <div className='container mx-auto p-6 lg:p-8 h-full w-full max-w-full flex-grow flex'>
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
