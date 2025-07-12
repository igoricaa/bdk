import Link from 'next/link';
import { Country, GENERAL_INFO_QUERYResult, Social } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import PortableText from './ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { ChevronDown } from 'lucide-react';
import { getGeneralInfoData } from '@/sanity/lib/cached-queries';
import SocialBgIcon from './ui/icons/social-bg-icon';

const Footer = async () => {
  const { generalInfo, blinkdraft } = await getGeneralInfoData();

  if (!generalInfo || !blinkdraft) {
    return null;
  }

  return (
    <footer id='footer' className='bg-dark-blue'>
      <div className='bg-white rounded-t-main px-side pt-8 pb-8 md:pt-18 md:pb-10 xl:pt-22 xl:pb-20 2xl:pt-36 2xl:pb-34'>
        <MobileLinks
          blinkdraftLogo={blinkdraft.logo}
          generalInfo={generalInfo}
        />
        <DesktopLinks
          blinkdraftLogo={blinkdraft.logo}
          generalInfo={generalInfo}
        />
        <section className='mt-8 xl:mt-20'>
          <ul
            className={
              'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-4 xl:gap-2.5 2xl:gap-5'
            }
          >
            {generalInfo.countries.map((country, index) => (
              <CountryCard
                key={country.name}
                country={country as Country}
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
    <li key={social.name}>
      <Link href={social.link} className='flex items-center gap-2.5'>
        <SocialBgIcon social={social} />
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
  className,
}: {
  country: Country;
  index: number;
  className?: string;
}) => {
  return (
    <article
      className={`bg-lightest-blue/25 p-6 rounded-[10px] min-h-56 md:min-h-48 2xl:min-h-58 pt-6 px-5 ${className}`}
    >
      <div className='flex items-center justify-between'>
        <h3 className='text-xl 2xl:text-2xl'>{country.name}</h3>
        <span className='text-light-blue text-sm 2xl:text-base'>0{index}</span>
      </div>
      <PortableText
        value={country.address as PortableTextBlock[]}
        className='mt-6 md:mt-4 xl:mt-6 text-grey-text md:text-sm 2xl:text-lg'
        paragraphClassName='mt-0! md:text-sm! 2xl:text-base! 3xl:text-lg!'
      />
      {country.phone && (
        <Link
          href={`tel:${country.phone}`}
          className='block text-grey-text underline md:text-sm 2xl:text-base 3xl:text-lg mt-3'
        >
          {country.phone}
        </Link>
      )}
      <Link
        href={`mailto:${country.email}`}
        className='block text-grey-text underline md:text-sm 2xl:text-base 3xl:text-lg mt-3 wrap-break-word'
      >
        {country.email}
      </Link>
      {country.note && (
        <p className='text-light-blue md:text-sm 2xl:text-base 3xl:text-lg mt-3 '>
          {country.note}
        </p>
      )}
    </article>
  );
};

const MobileLinks = ({
  blinkdraftLogo,
  generalInfo,
}: {
  blinkdraftLogo: any;
  generalInfo: GENERAL_INFO_QUERYResult['generalInfo'];
}) => {
  return (
    <section className='grid grid-cols-1 md:hidden'>
      <Accordion type='single' collapsible>
        <MobileAccordionItem title='Company'>
          <FooterLink href='/about-us'>About us</FooterLink>
          <FooterLink href='/about-us#independentReviews'>
            Independent reviews
          </FooterLink>
        </MobileAccordionItem>
        <MobileAccordionItem title='People'>
          <FooterLink href='/people#partners'>Partners & Counsels</FooterLink>
          <FooterLink href='/people#attorneys'>Attorneys at Law</FooterLink>
          <FooterLink href='/people#consultants'>Consultants</FooterLink>
          <FooterLink href='/people#juniorAssociates'>
            Junior Associates
          </FooterLink>
          <FooterLink href='/career'>Career</FooterLink>
        </MobileAccordionItem>
        <MobileAccordionItem title='Services'>
          <FooterLink href='/practices/banking-and-finance'>
            Practices
          </FooterLink>
          <FooterLink href='/industries/energy-and-natural-resources'>
            Industries
          </FooterLink>
        </MobileAccordionItem>
        <MobileAccordionItem title='Newsroom'>
          <FooterLink href='/bdknowledge'>BDKnowledge</FooterLink>
          <FooterLink href='/blog'>Blog</FooterLink>
          <FooterLink href='/digital-watch'>Digital Watch</FooterLink>
          <FooterLink href='/insights'>Insight</FooterLink>
          <FooterLink href='/publications'>Publications</FooterLink>
        </MobileAccordionItem>
      </Accordion>

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
  );
};

const MobileAccordionItem = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <AccordionItem
      value={title}
      className='border-b border-lightest-blue rounded-none pb-4'
    >
      <AccordionTrigger
        className='text-base font-medium pb-0 [&[data-state=open]>svg]:rotate-180'
        icon={<ChevronDown className='text-light-blue' strokeWidth={1} />}
      >
        {title}
      </AccordionTrigger>
      <AccordionContent>
        <ul className='flex flex-col gap-y-3 mt-3'>{children}</ul>
      </AccordionContent>
    </AccordionItem>
  );
};

const DesktopLinks = ({
  blinkdraftLogo,
  generalInfo,
}: {
  blinkdraftLogo: any;
  generalInfo: GENERAL_INFO_QUERYResult['generalInfo'];
}) => {
  return (
    <section className='hidden md:grid grid-cols-5 gap-x-5 xl:gap-x-8'>
      <div>
        <FooterHeading>Company</FooterHeading>
        <ul className='flex flex-col gap-y-6 mt-6'>
          <FooterLink href='/about-us'>About us</FooterLink>
          <FooterLink href='/about-us#independentReviews'>
            Independent reviews
          </FooterLink>
        </ul>
      </div>
      <div>
        <FooterHeading>People</FooterHeading>
        <ul className='flex flex-col gap-y-6 mt-6'>
          <FooterLink href='/people#partners'>Partners & Counsels</FooterLink>
          <FooterLink href='/people#attorneys'>Attorneys at Law</FooterLink>
          <FooterLink href='/people#consultants'>Consultants</FooterLink>
          <FooterLink href='/people#juniorAssociates'>
            Junior Associates
          </FooterLink>
          <FooterLink href='/career'>Career</FooterLink>
        </ul>
      </div>
      <div>
        <FooterHeading>Services</FooterHeading>
        <ul className='flex flex-col gap-y-6 mt-6'>
          <FooterLink href='/practices/banking-and-finance'>
            Practices
          </FooterLink>
          <FooterLink href='/industries/energy-and-natural-resources'>
            Industries
          </FooterLink>
        </ul>
      </div>
      <div>
        <FooterHeading>Newsroom</FooterHeading>
        <ul className='flex flex-col gap-y-6 mt-6'>
          <FooterLink href='/bdknowledge'>BDKnowledge</FooterLink>
          <FooterLink href='/blog'>Blog</FooterLink>
          <FooterLink href='/digital-watch'>Digital Watch</FooterLink>
          <FooterLink href='/insights'>Insight</FooterLink>
          <FooterLink href='/publications'>Publications</FooterLink>
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
  );
};
