import { Box, Flex, Heading, Link, Text, Skeleton } from '@chakra-ui/react';
import { FC } from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { heading2Style, mainBoxStyle } from '../../../styles/common';
import { leaderLink, mainText, mainTextBox } from '../../../styles/pages/about';
import ChakraNextImage from '../../chakra-nextimage';
import { featureText } from '../../Home/Facts/styles';
import {
  cardSectionFlex,
  cardSectionImage,
  cardSectionWrapper,
  departmentBoxProps,
  iconDepartmentBoxProps,
} from './style';
import { ICardSection } from './types';

const CardSection: FC<ICardSection> = ({ heading, description, cards }) => {
  return (
    <Box {...mainBoxStyle}>
      <Box {...mainTextBox} mb='30px'>
        <Heading {...heading2Style} mb='20px'>
          {heading}
        </Heading>
        <Text {...featureText}>{description}</Text>
      </Box>

      <Flex wrap='wrap' justify='center' gap='30px'>
        {!!cards
          ? cards?.map((leader) => (
              <Box key={leader.title} {...cardSectionWrapper}>
                <ChakraNextImage
                  {...cardSectionImage}
                  src={leader.imageSrc || '/assets/placeholder.png'}
                />
                <Flex {...cardSectionFlex}>
                  <Box w='100%'>
                    <Heading fontSize='1.2rem'>{leader?.user?.name}</Heading>
                    <Text fontSize='.8rem' mt='2'>
                      {leader?.position}
                    </Text>
                    <Flex mt='4'>
                      <Link
                        _hover={{ bg: '#814226', _first: { color: '#F3F2F2' } }}
                        {...leaderLink}
                      >
                        <FaTwitter size='20px' />
                      </Link>
                      <Link
                        _hover={{
                          bg: '#814226',
                          _notFirst: { color: '#F3F2F2' },
                        }}
                        {...leaderLink}
                      >
                        <FaFacebook size='20px' />
                      </Link>
                      <Link
                        _hover={{ bg: '#814226', _last: { color: '#F3F2F2' } }}
                        {...leaderLink}
                      >
                        <FaLinkedin size='20px' />
                      </Link>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            ))
          : [1, 2, 3].map((cur) => (
              <Box key={cur} {...departmentBoxProps}>
                <Skeleton {...iconDepartmentBoxProps} />
                <Skeleton h='50px' mb='20px' />
                <Skeleton h='30px' />
                <Skeleton h='30px' />
              </Box>
            ))}
      </Flex>
    </Box>
  );
};

export default CardSection;
