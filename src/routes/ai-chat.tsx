/**
 * @description: AI 对话页面
 */
import { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { postAiCompletionApi } from '@/service';
import type { AiMessageDto } from '@/service/types';

export default function AiChat(): React.ReactElement {
  const [messages, setMessages] = useState<AiMessageDto[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: '欢迎使用 AI 对话！有什么可以帮助你的？' }]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) {
      return;
    }

    const userMessage: AiMessageDto = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await postAiCompletionApi({
        messages: newMessages,
      });

      const aiMessage: AiMessageDto = {
        role: 'assistant',
        content: response.data?.content ?? 'AI 响应失败',
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages(newMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    if (confirm('确定要清空对话历史吗？')) {
      setMessages([{ role: 'assistant', content: '欢迎使用 AI 对话！有什么可以帮助你的？' }]);
    }
  };

  return (
    <Flex minH="100vh" direction="column" bg="gray.50">
      <Box bg="white" borderBottom="1px" borderColor="gray.200" p={4}>
        <Flex justify="space-between" align="center">
          <Heading as="h1" size="lg">
            AI 对话
          </Heading>
          <Stack direction="row" gap={3}>
            <Button
              onClick={handleClearChat}
              bg="gray.200"
              color="gray.700"
              _hover={{ bg: 'gray.300' }}
            >
              清空对话
            </Button>
            <RouterLink
              to="/ai/config"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              配置 AI
            </RouterLink>
          </Stack>
        </Flex>
      </Box>

      <Flex flex={1} overflow="hidden">
        <Box flex={1} overflowY="auto" p={4} spaceY={4}>
          {messages.map((message, index) => (
            <Flex key={index} justify={message.role === 'user' ? 'flex-end' : 'flex-start'} mb={4}>
              <Box
                maxW="70%"
                px={4}
                py={2}
                rounded="2xl"
                bg={message.role === 'user' ? 'blue.600' : 'gray.200'}
                color={message.role === 'user' ? 'white' : 'gray.900'}
                borderRadius={message.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px'}
              >
                <Text whiteSpace="pre-wrap">{message.content}</Text>
              </Box>
            </Flex>
          ))}

          {isLoading && (
            <Flex justify="flex-start" mb={4}>
              <Box
                px={4}
                py={2}
                rounded="2xl"
                bg="gray.200"
                color="gray.900"
                borderRadius="20px 20px 20px 4px"
              >
                <Text>AI 正在思考...</Text>
              </Box>
            </Flex>
          )}

          <div ref={messagesEndRef} />
        </Box>
      </Flex>

      <Box bg="white" borderTop="1px" borderColor="gray.200" p={4}>
        <Flex gap={3}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入消息... (Shift+Enter 换行)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none min-h-[48px] max-h-[200px] bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            bg="linear-gradient(to right, blue.600, indigo.600)"
            color="white"
            px={6}
            _hover={{
              bg: 'linear-gradient(to right, blue.700, indigo.700)',
            }}
            _disabled={{
              bg: 'gray.400',
              cursor: 'not-allowed',
            }}
          >
            发送
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
