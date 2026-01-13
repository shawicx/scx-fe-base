import { Link as RouterLink } from 'react-router-dom';
import { Flex, Heading, Text } from '@chakra-ui/react';

export default function About(): React.ReactElement {
  return (
    <Flex minH="100vh" direction="column" align="center" justify="center" bg="gray.50" p={4}>
      <Heading as="h1" size="2xl" color="gray.900" mb={4}>
        关于
      </Heading>
      <Text color="gray.600" mb={8} textAlign="center">
        这是一个包含 TypeScript、React Router、Chakra UI、oxlint 和 commitlint 的起步模板。
      </Text>
      <RouterLink
        to="/"
        className="inline-flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        返回首页
      </RouterLink>
    </Flex>
  );
}
