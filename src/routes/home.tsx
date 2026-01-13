import { Link as RouterLink } from 'react-router-dom';
import { Flex, Heading, Text } from '@chakra-ui/react';

export default function Home(): React.ReactElement {
  return (
    <Flex minH="100vh" direction="column" align="center" justify="center" bg="gray.50" p={4}>
      <Heading as="h1" size="2xl" color="gray.900" mb={4}>
        欢迎来到 SCX FE Base
      </Heading>
      <Text color="gray.600" mb={8} textAlign="center">
        一个现代化的 React + TypeScript + React Router + Chakra UI 起步模板
      </Text>
      <RouterLink
        to="/about"
        className="inline-flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        关于
      </RouterLink>
    </Flex>
  );
}
