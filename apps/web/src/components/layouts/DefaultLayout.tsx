import { Box, Flex, Image } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'
import React, { useEffect, useState } from 'react'
import { Navbar } from '../modules'
import { InternalError, NotFound } from '../shared'

type DefaultLayoutProps = {
    children: React.ReactNode
    title?: string
    queryStatus?: number
    fadedImage?: string
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {

    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY
            setScrollPosition(currentPosition)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return <Box
        backgroundColor='#13161d'
        minHeight='100vh'
    >
        <Helmet>
            <title>{props.title || 'Cinéstia'}</title>
        </Helmet>

        <Navbar />

        <Flex
            position='absolute'
            w='100%'
            h='100%'
            zIndex={1}
            justifyContent='center'
        >
            <Box maxWidth='70vw'>
                {props.queryStatus === 404 ? <NotFound /> :
                    (props.queryStatus === 500 ? <InternalError /> :
                        props.children)
                }
                <Box height='5em' />
            </Box>
        </Flex>

        {props.fadedImage && <Box position='relative'>
            <Image
                position='fixed'
                src={props.fadedImage}
                // position='absolute'
                top='0'
                left='0'
                width='100vw'
                height='80vh'
                objectFit='cover'
                objectPosition='top'
                filter='brightness(30%)'
                opacity={1 - scrollPosition / 750}
                // backgroundPosition='top'
                // backgroundSize='cover'
                // backgroundImage={`linear-gradient(to bottom, transparent, #031330), url(${movie.background.url})`}
                sx={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'top',
                }}
            />
        </Box>
        }
    </Box>

}