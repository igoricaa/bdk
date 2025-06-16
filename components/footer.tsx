import Link from 'next/link';
import { Country, GeneralInfo, Social } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import PortableText from './ui/portable-text';
import { PortableTextBlock } from 'next-sanity';

const Footer = ({
  generalInfo,
  blinkdraftLogo,
}: {
  generalInfo: GeneralInfo;
  blinkdraftLogo: any;
}) => {
  return (
    <footer className='bg-light-blue-bg'>
      <div className='bg-white rounded-t-main px-side pt-12 pb-8 md:pt-18 md:pb-10 xl:pt-22 xl:pb-20 2xl:pt-36 2xl:pb-34 '>
        <section className='grid grid-cols-1 md:grid-cols-5 gap-x-5 xl:gap-x-8'>
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className='flex flex-col gap-y-6 mt-6'>
              <FooterLink href='/'>About us</FooterLink>
              <FooterLink href='/'>Independent reviews</FooterLink>
            </ul>
          </div>
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className='flex flex-col gap-y-6 mt-6'>
              <FooterLink href='/'>About us</FooterLink>
              <FooterLink href='/'>Independent reviews</FooterLink>
            </ul>
          </div>
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className='flex flex-col gap-y-6 mt-6'>
              <FooterLink href='/'>About us</FooterLink>
              <FooterLink href='/'>Independent reviews</FooterLink>
            </ul>
          </div>
          <div>
            <FooterHeading>Company</FooterHeading>
            <ul className='flex flex-col gap-y-6 mt-6'>
              <FooterLink href='/'>About us</FooterLink>
              <FooterLink href='/'>Independent reviews</FooterLink>
            </ul>
          </div>
          <div className='flex justify-between md:flex-col md:justify-normal gap-4 md:gap-10 mt-11 md:mt-0'>
            {blinkdraftLogo && (
              <div className='w-27'>
                <img
                  src={urlFor(blinkdraftLogo).url()}
                  alt='BDK - Blinkdraft'
                  className='w-full h-full object-cover'
                />
              </div>
            )}
            <ul className='flex md:flex-col gap-4 md:gap-6 '>
              {generalInfo?.socials.map((social: Social) => (
                <FooterSocial key={social.name} social={social} />
              ))}
            </ul>
          </div>
        </section>
        <section className='mt-8'>
          <ul
            className={
              'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-4 xl:gap-2.5 2xl:gap-5'
            }
          >
            {generalInfo?.countries.map((country, index) => (
              <CountryCard
                key={country.name}
                country={country}
                index={index + 1}
              />
            ))}
          </ul>
        </section>
        <section className='flex flex-col gap-19 md:flex-row md:justify-between border-t border-lightest-blue pt-3 md:pt-9 xl:pt-8 2xl:pt-10 mt-8 md:mt-10 xl:mt-9 2xl:mt-22'>
          <div className='flex justify-between items-center gap-4 md:gap-8'>
            <Link href='/' className='text-[#BEC1C6] text-sm 2xl:text-lg'>
              Privacy Notice
            </Link>
            <Link href='/' className='text-[#BEC1C6] text-sm 2xl:text-lg'>
              Cookie Policy
            </Link>
          </div>
          <p className='text-[#BEC1C6] text-sm text-center 2xl:text-lg'>
            Copyright © BDK Advokati 2025
          </p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;

const FooterLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li className='text-grey-text text-xs xl:text-sm 2xl:text-lg'>
      <Link href={href}>{children}</Link>
    </li>
  );
};

const FooterHeading = ({ children }: { children: React.ReactNode }) => {
  return <h2 className='text-sm 2xl:text-lg font-light'>{children}</h2>;
};

const FooterSocial = ({ social }: { social: Social }) => {
  return (
    <li key={social.name} className=''>
      <Link href={social.link} className='flex items-center gap-2.5'>
        <div className='flex items-center justify-center min-w-7.5 min-h-7.5 w-7.5 h-7.5 rounded-full bg-light-blue p-2'>
          <img
            src={urlFor(social.icon).url()}
            alt={social.name}
            className='object-cover'
          />
        </div>
        <span className='hidden md:block text-light-blue text-xs xl:text-sm 2xl:text-lg whitespace-nowrap'>
          Follow us on {social.name}
        </span>
      </Link>
    </li>
  );
};

const CountryCard = ({
  country,
  index,
}: {
  country: Country;
  index: number;
}) => {
  return (
    <article className='bg-lightest-blue/25 p-6 rounded-[10px] h-56 md:h-48 2xl:h-58 pt-6 px-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-xl 2xl:text-2xl'>{country.name}</h3>
        <span className='text-light-blue text-sm 2xl:text-base'>0{index}</span>
      </div>
      <PortableText
        value={country.address as PortableTextBlock[]}
        className='mt-6 md:mt-4 xl:mt-6 text-grey-text md:text-sm 2xl:text-lg'
      />
      {country.phone && (
        <p className='text-grey-text underline md:text-sm 2xl:text-lg mt-3'>
          {country.phone}
        </p>
      )}
      <p className='text-grey-text underline md:text-sm 2xl:text-lg mt-3'>
        {country.email}
      </p>
      {country.note && (
        <p className='text-light-blue md:text-sm 2xl:text-lg mt-3 '>
          {country.note}
        </p>
      )}
    </article>
  );
};
