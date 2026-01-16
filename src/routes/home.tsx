import { Link as RouterLink } from 'react-router-dom';
import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { ParticleBackground } from '@/components/ParticleBackground';

export default function Home(): React.ReactElement {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <ParticleBackground />
      <Flex
        direction="column"
        align="center"
        justify="center"
        w="full"
        h="full"
        p={4}
        position="relative"
        zIndex={1}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/50 pointer-events-none" />
        <Heading
          as="h1"
          size="3xl"
          mb={4}
          position="relative"
          zIndex={1}
          bgGradient="to-r blue.300, indigo.300, purple.300"
          bgClip="text"
          fontWeight="bold"
          letterSpacing="tight"
        >
          SCX FE Base
        </Heading>
        <Text
          color="white"
          mb={2}
          textAlign="center"
          fontSize="xl"
          position="relative"
          zIndex={1}
          fontWeight="medium"
        >
          欢迎使用
        </Text>
        <Text color="white" mb={10} textAlign="center" fontSize="md" position="relative" zIndex={1}>
          React + TypeScript + React Router + Chakra UI
        </Text>
        <Stack gap={4} width="full" maxW="md" position="relative" zIndex={1}>
          <RouterLink
            to="/login"
            className="inline-flex items-center justify-center px-6 py-4 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 font-semibold text-lg"
            style={{ color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,.7)' }}
          >
            登录
          </RouterLink>
          <RouterLink
            to="/register"
            className="inline-flex items-center justify-center px-6 py-4 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 font-semibold text-lg"
            style={{ color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,.7)' }}
          >
            注册
          </RouterLink>
          <RouterLink
            to="/reset-password"
            className="inline-flex items-center justify-center px-6 py-4 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 font-semibold text-lg"
            style={{ color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,.7)' }}
          >
            忘记密码
          </RouterLink>
          <RouterLink
            to="/about"
            className="inline-flex items-center justify-center px-6 py-4 text-white bg-gradient-to-r from-sky-600 to-cyan-500 rounded-xl hover:bg-sky-700 transition-all hover:scale-105 border border-gray-600 font-semibold text-lg"
            style={{ color: '#fff', textShadow: '0 2px 6px rgba(0,0,0,.7)' }}
          >
            关于
          </RouterLink>
        </Stack>
      </Flex>
    </div>
  );
}
