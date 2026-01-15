/**
 * @description: AI 配置页面
 */
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Checkbox,
  Stack,
  Text,
  useCheckbox,
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { getAiProvidersApi, putAiConfigApi, postAiTestConnectionApi } from '@/service';

interface Provider {
  type: string;
  name: string;
  [key: string]: any;
}

export default function AiConfig(): React.ReactElement {
  const navigate = useNavigate();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [config, setConfig] = useState<{
    defaultProvider: string;
    providers: Record<string, { apiKey: string }>;
  }>({
    defaultProvider: '',
    providers: {},
  });

  const checkbox = useCheckbox();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [testingProvider, setTestingProvider] = useState<string | null>(null);

  const fetchProviders = async () => {
    try {
      setIsLoading(true);
      const response = await getAiProvidersApi({});
      console.log('获取提供商列表:', response);
      const providersData = (response || []) as Provider[];
      setProviders(providersData);
      setConfig((prev) => ({
        ...prev,
        providers: providersData.reduce(
          (acc, provider) => ({
            ...acc,
            [provider.type]: { apiKey: prev.providers[provider.type]?.apiKey || '' },
          }),
          {}
        ),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleApiKeyChange = (providerId: string, value: string) => {
    setConfig((prev) => ({
      ...prev,
      providers: {
        ...prev.providers,
        [providerId]: { apiKey: value },
      },
    }));
  };

  const handleDefaultProviderChange = (providerId: string, checked: boolean) => {
    console.log('设置默认提供商:', providerId, checked);
    if (checked) {
      setConfig((prev) => ({ ...prev, defaultProvider: providerId }));
    } else if (config.defaultProvider === providerId) {
      setConfig((prev) => ({ ...prev, defaultProvider: '' }));
    }
  };

  const handleTestConnection = async (providerId: string) => {
    try {
      console.log('测试连接提供商:', providerId, config.providers[providerId]);
      const apiKey = config.providers[providerId]?.apiKey;
      if (!apiKey) {
        toaster.create({
          title: '请先输入 API Key',
          type: 'error',
        });
        return;
      }

      setTestingProvider(providerId);
      await postAiTestConnectionApi({ provider: providerId, apiKey });
      toaster.create({
        title: `${providers.find((p) => p.type === providerId)?.name || providerId} 连接成功`,
        type: 'success',
      });
    } finally {
      setTestingProvider(null);
    }
  };

  const handleSaveConfig = async () => {
    if (!config.defaultProvider) {
      toaster.create({
        title: '请选择默认提供商',
        type: 'error',
      });
      return;
    }

    const { defaultProvider, providers } = config;
    const hasEmptyKey = Object.entries(providers).some(([_, p]) => !p.apiKey);

    if (hasEmptyKey) {
      toaster.create({
        title: 'API Key 不能为空',
        type: 'error',
      });
      return;
    }

    try {
      setIsSaving(true);
      await putAiConfigApi({
        defaultProvider,
        providers,
      });
      toaster.create({
        title: '配置保存成功',
        type: 'success',
      });
      navigate('/ai/chat');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4}>
        <Text>加载中...</Text>
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" direction="column" align="center" justify="center" bg="gray.50" p={8}>
      <Box w="full" maxW="2xl" bg="white" rounded="2xl" shadow="2xl" p={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={2}>
          AI 配置
        </Heading>
        <Text textAlign="center" color="gray.600" mb={8}>
          配置您的 AI 服务提供商和 API Key
        </Text>
        <Stack gap={6}>
          {providers.map((provider) => (
            <Box key={provider.type} p={6} bg="gray.50" rounded="xl">
              <Flex justify="space-between" align="center" mb={4}>
                <Heading as="h3" size="md">
                  {provider.name}
                </Heading>
                <Checkbox.Root
                  checked={config.defaultProvider === provider.type}
                  onCheckedChange={({ checked }) =>
                    handleDefaultProviderChange(provider.type, checked as boolean)
                  }
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>默认</Checkbox.Label>
                </Checkbox.Root>
              </Flex>

              <Stack gap={3}>
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    API Key
                  </Text>
                  <Input
                    type="password"
                    value={config.providers[provider.type]?.apiKey || ''}
                    onChange={(e) => handleApiKeyChange(provider.type, e.target.value)}
                    placeholder="请输入 API Key"
                    bg="white"
                  />
                </Box>

                <Button
                  onClick={() => handleTestConnection(provider.type)}
                  loading={testingProvider === provider.type}
                  disabled={!config.providers[provider.type]?.apiKey}
                  bg="gray.200"
                  color="gray.700"
                  _hover={{ bg: 'gray.300' }}
                  _disabled={{ bg: 'gray.100', color: 'gray.400' }}
                  width="full"
                >
                  测试连接
                </Button>
              </Stack>
            </Box>
          ))}

          {providers.length === 0 && (
            <Box p={6} bg="gray.50" rounded="xl" textAlign="center">
              <Text color="gray.600">暂无可用的 AI 提供商</Text>
            </Box>
          )}

          <Stack direction="row" gap={3}>
            <RouterLink
              to="/ai/chat"
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              前往对话
            </RouterLink>
            <Button
              onClick={handleSaveConfig}
              loading={isSaving}
              bg="linear-gradient(to right, blue.600, indigo.600)"
              color="white"
              flex={1}
              _hover={{
                bg: 'linear-gradient(to right, blue.700, indigo.700)',
              }}
            >
              保存配置
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
