import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Flex, Field, Heading, Input, Stack } from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';
import { resetPasswordFormSchema, sendVerificationCodeSchema } from '@/lib/schemas';
import { ParticleBackground } from '@/components/ParticleBackground';

type ResetPasswordForm = {
  email: string;
  password: string;
  confirmPassword: string;
  emailVerificationCode: string;
};

export default function ResetPassword(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<ResetPasswordForm>({
    email: '',
    password: '',
    confirmPassword: '',
    emailVerificationCode: '',
  });

  const handleChange = (field: keyof ResetPasswordForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateEmail = (): boolean => {
    const result = sendVerificationCodeSchema.safeParse({ email: form.email });
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

  const validateForm = (): boolean => {
    const result = resetPasswordFormSchema.safeParse(form);
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

  const handleSendCode = async () => {
    if (!validateEmail()) return;

    setIsSendingCode(true);
    try {
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
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      toaster.create({ title: '密码重置成功', type: 'success' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      <ParticleBackground />
      <Flex align="center" justify="center" w="full" h="full" px={4} position="relative" zIndex={1}>
        <Box
          w="full"
          maxW="md"
          bg="gray.800/95"
          backdropFilter="blur-sm"
          rounded="2xl"
          shadow="2xl"
          p={10}
        >
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            bgGradient="to-r blue.400 indigo.400"
            bgClip="text"
            mb={8}
          >
            重置密码
          </Heading>

          <form onSubmit={handleSubmit}>
            <Stack gap={6}>
              <Field.Root invalid={!!errors.email}>
                <Field.Label color="gray.300">邮箱</Field.Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="请输入邮箱"
                  bg="gray.700"
                  borderColor="gray.600"
                  color="white"
                  borderRadius="xl"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{ bg: 'gray.700', borderColor: 'blue.500' }}
                  _hover={{ bg: 'gray.700' }}
                />
                {errors.email && <Field.ErrorText color="red.400">{errors.email}</Field.ErrorText>}
              </Field.Root>

              <Field.Root invalid={!!errors.emailVerificationCode}>
                <Field.Label color="gray.300">验证码</Field.Label>
                <Flex gap={3}>
                  <Input
                    type="text"
                    value={form.emailVerificationCode}
                    onChange={(e) => handleChange('emailVerificationCode', e.target.value)}
                    placeholder="请输入验证码"
                    maxLength={6}
                    bg="gray.700"
                    borderColor="gray.600"
                    color="white"
                    borderRadius="xl"
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{ bg: 'gray.700', borderColor: 'blue.500' }}
                    _hover={{ bg: 'gray.700' }}
                  />
                  <Button
                    type="button"
                    onClick={handleSendCode}
                    disabled={isSendingCode || countdown > 0}
                    bg="gray.600"
                    color="gray.200"
                    borderRadius="xl"
                    _hover={{ bg: 'gray.500' }}
                    _disabled={{ bg: 'gray.700', color: 'gray.500', cursor: 'not-allowed' }}
                    whiteSpace="nowrap"
                  >
                    {isSendingCode ? '发送中...' : countdown > 0 ? `${countdown}秒` : '发送验证码'}
                  </Button>
                </Flex>
                {errors.emailVerificationCode && (
                  <Field.ErrorText color="red.400">{errors.emailVerificationCode}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.password}>
                <Field.Label color="gray.300">新密码</Field.Label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="请输入新密码（至少6位）"
                  bg="gray.700"
                  borderColor="gray.600"
                  color="white"
                  borderRadius="xl"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{ bg: 'gray.700', borderColor: 'blue.500' }}
                  _hover={{ bg: 'gray.700' }}
                />
                {errors.password && (
                  <Field.ErrorText color="red.400">{errors.password}</Field.ErrorText>
                )}
              </Field.Root>

              <Field.Root invalid={!!errors.confirmPassword}>
                <Field.Label color="gray.300">确认密码</Field.Label>
                <Input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="请再次输入新密码"
                  bg="gray.700"
                  borderColor="gray.600"
                  color="white"
                  borderRadius="xl"
                  _placeholder={{ color: 'gray.400' }}
                  _focus={{ bg: 'gray.700', borderColor: 'blue.500' }}
                  _hover={{ bg: 'gray.700' }}
                />
                {errors.confirmPassword && (
                  <Field.ErrorText color="red.400">{errors.confirmPassword}</Field.ErrorText>
                )}
              </Field.Root>

              <Button
                type="submit"
                loading={isLoading}
                bg="linear-gradient(to right, blue.500, indigo.500)"
                color="white"
                size="lg"
                borderRadius="xl"
                _hover={{
                  bg: 'linear-gradient(to right, blue.600, indigo.600)',
                }}
                width="full"
              >
                提交
              </Button>
            </Stack>
          </form>

          <Box mt={8} pt={6} borderTop="1px" borderColor="gray.600" textAlign="center">
            <RouterLink to="/login" className="text-blue-400 font-bold hover:underline">
              返回登录
            </RouterLink>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}
