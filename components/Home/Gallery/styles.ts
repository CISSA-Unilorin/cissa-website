import { TextProps, BoxProps } from '@chakra-ui/react';

export const featureText: TextProps = {
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '26px',
    textAlign: 'center',
    color: 'grey.text',
};

export const iconBtn: TextProps = {
    bg: '#FFF2EC',
    borderRadius: '50%',
    position: 'absolute',
    w: '1rem',
    h: '2.5rem',
    top: '50%',
    zIndex: '10'
};

export const galleryImage: TextProps = {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '0 0, 100% 0',
    width: '100%',
    height: 400,
    borderRadius: '5%'
}

export const resourceBoximg: BoxProps = {
    position: 'relative',
};
export const resourcedots1: BoxProps = {
    bottom: '80%',
    right: '8%',
    transform: 'translateY(25rem)'
};

export const button: BoxProps = {
    borderRadius: '10px',
    shadow: '0px 1px 3px rgba(50, 50, 71, 0.02), 0px 4px 1px rgba(12, 26, 75, 0.1)',
    mx: 'auto',
    px: '30px',
    py: '21px',
    mt: '40px'
}