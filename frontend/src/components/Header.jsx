import { Navbar, NavbarBrand, NavbarContent, Image } from '@nextui-org/react';

export default function Header() {
  return (
    <Navbar
      isBlurred
      maxWidth='2xl'
      className='max-w-full py-4 min-h-[120px] md:min-h-[80px]'
      height='auto'
      classNames={{
        wrapper: 'align-center'
      }}
    >
      <NavbarBrand justify='center'>
        <Image
          src='/logo/rs-logo.png'
          alt='ResearchSat logo'
          className='w-full max-h-[50px] md:w-auto'
        />
      </NavbarBrand>
      <NavbarContent justify='left'>Left content</NavbarContent>
    </Navbar>
  );
}
