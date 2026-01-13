import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Checkbox, Flex, Field, Heading, Input, Stack, Tabs } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { useAuth } from '@/hooks/use-auth';
import { loginFormSchema, sendVerificationCodeSchema } from '@/lib/schemas';

type PasswordForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type CodeForm = {
  email: string;
  emailVerificationCode: string;
};

export default function Login(): React.ReactElement {
  const navigate = useNavigate();
  const { login, loginWithCode, sendVerificationCode } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [codeForm, setCodeForm] = useState<CodeForm>({
    email: '',
    emailVerificationCode: '',
  });

  const handlePasswordChange = (field: keyof PasswordForm, value: string | boolean) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCodeChange = (field: keyof CodeForm, value: string) => {
    setCodeForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validatePasswordForm = (): boolean => {
    const result = loginFormSchema.safeParse(passwordForm);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const validateCodeForm = (): boolean => {
    const result = sendVerificationCodeSchema.safeParse({ email: codeForm.email });
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    if (!codeForm.emailVerificationCode || codeForm.emailVerificationCode.length !== 6) {
      setErrors({ emailVerificationCode: '验证码为 6 位' });
      return false;
    }

    return true;
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    setIsLoading(true);
    try {
      const { rememberMe: _rememberMe, ...loginData } = passwordForm;
      await login(loginData);
      toaster.create({ title: '登录成功', type: 'success' });
      navigate('/');
    } catch (error) {
      toaster.create({
        title: '登录失败',
        description: (error as Error).message,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendCode = async () => {
    const result = sendVerificationCodeSchema.safeParse({ email: codeForm.email });
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setIsSendingCode(true);
    try {
      await sendVerificationCode(codeForm.email);
      toaster.create({ title: '验证码已发送', type: 'success' });
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      toaster.create({
        title: '发送验证码失败',
        description: (error as Error).message,
        type: 'error',
      });
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleCodeLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCodeForm()) return;

    setIsLoading(true);
    try {
      await loginWithCode(codeForm);
      toaster.create({ title: '登录成功', type: 'success' });
      navigate('/');
    } catch (error) {
      toaster.create({
        title: '登录失败',
        description: (error as Error).message,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="blue.50" px={4}>
      <Box w="full" maxW="md" bg="white" rounded="2xl" shadow="2xl" p={10}>
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          bgGradient="to-r blue.600 indigo.600"
          bgClip="text"
          mb={8}
        >
          欢迎回来
        </Heading>

        <Tabs.Root defaultValue="password">
          <Tabs.List gap={2} p={1} bg="gray.100" borderRadius="xl">
            <Tabs.Trigger
              value="password"
              flex={1}
              py={3}
              px={4}
              fontSize="base"
              fontWeight="medium"
              borderRadius="lg"
              _selected={{ bg: 'white', color: 'blue.600', shadow: 'md', fontWeight: 'semibold' }}
              _hover={{ bg: 'gray.200' }}
            >
              密码登录
            </Tabs.Trigger>
            <Tabs.Trigger
              value="code"
              flex={1}
              py={3}
              px={4}
              fontSize="base"
              fontWeight="medium"
              borderRadius="lg"
              _selected={{ bg: 'white', color: 'blue.600', shadow: 'md', fontWeight: 'semibold' }}
              _hover={{ bg: 'gray.200' }}
            >
              验证码登录
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="password">
            <form onSubmit={handlePasswordLogin}>
              <Stack gap={6}>
                <Field.Root invalid={!!errors.email}>
                  <Field.Label>邮箱</Field.Label>
                  <Input
                    type="email"
                    value={passwordForm.email}
                    onChange={(e) => handlePasswordChange('email', e.target.value)}
                    placeholder="请输入邮箱"
                    bg="gray.50"
                    borderRadius="xl"
                    _focus={{ bg: 'white', borderColor: 'blue.500' }}
                    _hover={{ bg: 'gray.50' }}
                  />
                  {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                  <Field.Label>密码</Field.Label>
                  <Input
                    type="password"
                    value={passwordForm.password}
                    onChange={(e) => handlePasswordChange('password', e.target.value)}
                    placeholder="请输入密码"
                    bg="gray.50"
                    borderRadius="xl"
                    _focus={{ bg: 'white', borderColor: 'blue.500' }}
                    _hover={{ bg: 'gray.50' }}
                  />
                  {errors.password && <Field.ErrorText>{errors.password}</Field.ErrorText>}
                </Field.Root>

                <Flex align="center" justify="space-between">
                  <Checkbox.Root
                    checked={passwordForm.rememberMe}
                    onCheckedChange={(e) => handlePasswordChange('rememberMe', e.checked)}
                    colorPalette="blue"
                  >
                    <Checkbox.Control />
                    <Checkbox.Label>记住我</Checkbox.Label>
                  </Checkbox.Root>
                  <RouterLink
                    to="/reset-password"
                    className="text-blue-600 font-medium text-sm hover:underline"
                  >
                    忘记密码?
                  </RouterLink>
                </Flex>

                <Button
                  type="submit"
                  loading={isLoading}
                  bg="linear-gradient(to right, blue.600, indigo.600)"
                  color="white"
                  size="lg"
                  borderRadius="xl"
                  _hover={{
                    bg: 'linear-gradient(to right, blue.700, indigo.700)',
                  }}
                  width="full"
                >
                  登录
                </Button>
              </Stack>
            </form>
          </Tabs.Content>

          <Tabs.Content value="code">
            <form onSubmit={handleCodeLogin}>
              <Stack gap={6}>
                <Field.Root invalid={!!errors.email}>
                  <Field.Label>邮箱</Field.Label>
                  <Input
                    type="email"
                    value={codeForm.email}
                    onChange={(e) => handleCodeChange('email', e.target.value)}
                    placeholder="请输入邮箱"
                    bg="gray.50"
                    borderRadius="xl"
                    _focus={{ bg: 'white', borderColor: 'blue.500' }}
                    _hover={{ bg: 'gray.50' }}
                  />
                  {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
                </Field.Root>

                <Field.Root invalid={!!errors.emailVerificationCode}>
                  <Field.Label>验证码</Field.Label>
                  <Flex gap={3}>
                    <Input
                      type="text"
                      value={codeForm.emailVerificationCode}
                      onChange={(e) => handleCodeChange('emailVerificationCode', e.target.value)}
                      placeholder="请输入验证码"
                      maxLength={6}
                      bg="gray.50"
                      borderRadius="xl"
                      _focus={{ bg: 'white', borderColor: 'blue.500' }}
                      _hover={{ bg: 'gray.50' }}
                    />
                    <Button
                      type="button"
                      onClick={handleSendCode}
                      disabled={isSendingCode || countdown > 0}
                      bg="gray.100"
                      color="gray.700"
                      borderRadius="xl"
                      _hover={{ bg: 'gray.200' }}
                      _disabled={{ bg: 'gray.50', color: 'gray.400', cursor: 'not-allowed' }}
                      whiteSpace="nowrap"
                    >
                      {isSendingCode
                        ? '发送中...'
                        : countdown > 0
                          ? `${countdown}秒`
                          : '发送验证码'}
                    </Button>
                  </Flex>
                  {errors.emailVerificationCode && (
                    <Field.ErrorText>{errors.emailVerificationCode}</Field.ErrorText>
                  )}
                </Field.Root>

                <Button
                  type="submit"
                  loading={isLoading}
                  bg="linear-gradient(to right, blue.600, indigo.600)"
                  color="white"
                  size="lg"
                  borderRadius="xl"
                  _hover={{
                    bg: 'linear-gradient(to right, blue.700, indigo.700)',
                  }}
                  width="full"
                >
                  登录
                </Button>
              </Stack>
            </form>
          </Tabs.Content>
        </Tabs.Root>

        <Box mt={8} pt={6} borderTop="1px" borderColor="gray.200" textAlign="center">
          还没有账号？
          <RouterLink to="/register" className="text-blue-600 font-bold hover:underline ml-1">
            立即注册
          </RouterLink>
        </Box>
      </Box>
    </Flex>
  );
}
