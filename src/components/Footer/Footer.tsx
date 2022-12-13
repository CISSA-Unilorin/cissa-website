import {
  Box,
  Flex,
  chakra,
  Text,
  Heading,
  List,
  ListItem,
  Link,
  Icon,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';
import { mainBoxStyle } from '../../styles/common';
import { footerBox, linkHeading, linkItems } from './style';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const quickLinks = [
  {
    name: 'Archive',
    href: '/',
  },
  {
    name: 'Course materials',
    href: '/about',
  },
];

const pageLinks = [
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'About CIS',
    href: '/about',
  },
  {
    name: 'Contact us',
    href: '/contact',
  },
];

const social = [
  {
    name: FaFacebook,
    href: '#',
  },
  {
    name: FaTwitter,
    href: '#',
  },
  {
    name: FaInstagram,
    href: '#',
  },
  {
    name: FaEnvelope,
    href: '#',
  },
];

const Footer: FC = () => {
  return (
    <Box as="footer" {...footerBox}>
      <Box {...mainBoxStyle}>
        <Flex
          py={'50px'}
          gap={'40px'}
          direction={{ base: 'column', md: 'row' }}
        >
          <Box width={'340px'} maxW="100%">
            <Heading {...linkHeading}>Quick links</Heading>

            <List>
              {quickLinks.map(link => (
                <ListItem key={link.name}>
                  <NextLink href={link.href} passHref>
                    <Link {...linkItems}>{link.name}</Link>
                  </NextLink>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box width={'340px'} maxW="100%">
            <Heading {...linkHeading}>Pages</Heading>

            <List>
              {pageLinks.map(link => (
                <ListItem key={link.name}>
                  <NextLink href={link.href} passHref>
                    <Link {...linkItems}>{link.name}</Link>
                  </NextLink>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box width={'340px'} maxW="100%">
            <Heading {...linkHeading}>Connect</Heading>

            <Flex gap={'20px'}>
              {/* {social.map((link, i) => (
                <NextLink key={i} href={link.href} passHref>
                  <Icon as={link.name} h="30px" w="30px" color={'white'} />
                </NextLink>
              ))} */}
            </Flex>
          </Box>
        </Flex>
      </Box>
      <chakra.hr borderColor={'white'} />
      <Box {...mainBoxStyle}>
        <Text
          py={'15px'}
          textAlign="center"
          fontWeight={300}
          fontSize="16px"
          lineHeight="100%"
          color="white"
        >
          {new Date().getFullYear()}. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;