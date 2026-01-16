import { Link as RouterLink } from 'react-router-dom';
import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { ParticleBackground } from '@/components/ParticleBackground';

export default function About(): React.ReactElement {
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
        <Heading
          as="h1"
          size="2xl"
          mb={4}
          bgGradient="to-r blue.300, indigo.300, purple.300"
          bgClip="text"
          fontWeight="bold"
        >
          关于
        </Heading>
        <Text color="gray.300" mb={4} textAlign="center" fontSize="lg" maxW="md">
          这是一个现代化的 React 前端起步模板，集成以下技术栈：
        </Text>
        <Stack gap={2} mb={8} color="gray.400" fontSize="md">
          <Text>• React 19 + TypeScript</Text>
          <Text>• React Router v7</Text>
          <Text>• Chakra UI v3</Text>
          <Text>• UnoCSS</Text>
        </Stack>
        <RouterLink
          to="/"
          className="inline-flex items-center justify-center px-6 py-4 text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 font-semibold text-lg"
        >
          返回首页
        </RouterLink>
      </Flex>
    </div>
  );
}
