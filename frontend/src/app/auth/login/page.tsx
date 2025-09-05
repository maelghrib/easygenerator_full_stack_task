'use client';

import * as ChakraUI from "@chakra-ui/react"
import {PasswordInput} from "@/components/ui/password-input"
import {useState} from "react";
import {AxiosResponse, isAxiosError} from "axios";
import axios from "@/utils/axios";
import {useRouter} from 'next/navigation';
import {APIEndpoint, PageRoute, ResponseStatus} from "@/utils/constants";
import {LoginInputData, LoginInputDataErrors, LoginResponse} from "@/utils/types";
import {Link as ChakraLink} from "@chakra-ui/react"
import NextLink from "next/link"
import {loginSchema} from "@/utils/schemas";

export default function LoginPage() {

    const router = useRouter();

    const welcomeText = "Easygenerator Login"

    const initialLoginInputData: LoginInputData = {
        email: "",
        password: "",
    }

    const [loginInputData, setLoginInputData] = useState<LoginInputData>(initialLoginInputData)
    const [loginInputDataErrors, setLoginInputDataErrors] = useState<LoginInputDataErrors>({});
    const [visible, setVisible] = useState(false)

    const validateLoginInputData = (): boolean => {
        const result = loginSchema.safeParse(loginInputData);

        if (!result.success) {
            const newErrors: LoginInputDataErrors = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                if (!newErrors[field]) {
                    newErrors[field] = [];
                }
                newErrors[field].push(issue.message);
            });
            setLoginInputDataErrors(newErrors);
            return false;
        } else {
            setLoginInputDataErrors({});
            return true;
        }
    };

    const handleLoginError = (err: unknown) => {
        if (isAxiosError(err)) {
            if (err.response) {

                const data = err.response.data;

                if (data.errors) {
                    return data.errors;
                }

                if (Array.isArray(data.message)) {
                    return {global: data.message};
                }

                if (typeof data.message === "string") {
                    return {global: [data.message]};
                }

            }

            if (err.request) {
                console.error("Network error:", err.request);
                return {global: ["Network error. Please try again."]};
            }

            console.error("Axios error:", err.message);
            return {global: [err.message]};
        }

        console.error("Unexpected error:", err);
        return {global: ["Unexpected error occurred"]};
    };

    const onLogin = async () => {
        if (!validateLoginInputData()) return;

        try {
            const response: AxiosResponse<LoginResponse> = await axios.post(
                APIEndpoint.LOGIN, loginInputData, {withCredentials: true,}
            )
            if (response.data.status === ResponseStatus.SUCCESS) {
                router.push(PageRoute.HOME);
            } else {
            }

        } catch (error) {
            setLoginInputDataErrors(handleLoginError(error));
        }
    }

    return (
        <ChakraUI.Center w={"100%"} h={"100vh"} flexDir={"column"} gap={"5"}>

            <ChakraUI.Text fontSize="30px" fontWeight={"bold"}>{welcomeText}</ChakraUI.Text>

            {loginInputDataErrors.global?.map((msg, i) => (
                <p key={i} className="text-red-500 text-sm">{msg}</p>
            ))}

            <ChakraUI.Flex w={"30%"} flexDir={"column"} gap={"5"}>

                <ChakraUI.Field.Root required invalid={loginInputDataErrors.email?.length > 0}>
                    <ChakraUI.Field.Label>
                        Email <ChakraUI.Field.RequiredIndicator/>
                    </ChakraUI.Field.Label>
                    <ChakraUI.Input
                        placeholder="Enter Your Email"
                        onChange={event => {
                            const newLoginInputData: LoginInputData = {
                                ...loginInputData,
                                email: event.target.value
                            }
                            setLoginInputData(newLoginInputData)
                        }}
                    />
                    {loginInputDataErrors.email?.map((err, i) => (
                        <ChakraUI.Field.ErrorText key={i}>{err}</ChakraUI.Field.ErrorText>
                    ))}
                </ChakraUI.Field.Root>

                <ChakraUI.Field.Root required invalid={loginInputDataErrors.password?.length > 0}>
                    <ChakraUI.Field.Label>
                        Password <ChakraUI.Field.RequiredIndicator/>
                    </ChakraUI.Field.Label>
                    <PasswordInput
                        placeholder="Enter Your Password"
                        visible={visible}
                        onVisibleChange={setVisible}
                        onChange={event => {
                            const newLoginInputData: LoginInputData = {
                                ...loginInputData,
                                password: event.target.value
                            }
                            setLoginInputData(newLoginInputData)
                        }}
                    />
                    {loginInputDataErrors.password?.map((err, i) => (
                        <ChakraUI.Field.ErrorText key={i}>{err}</ChakraUI.Field.ErrorText>
                    ))}
                </ChakraUI.Field.Root>

                <ChakraUI.Button onClick={onLogin}>Login</ChakraUI.Button>

            </ChakraUI.Flex>

            <ChakraLink asChild>
                <NextLink href={PageRoute.SIGNUP}>New Account? SignUp Here</NextLink>
            </ChakraLink>

        </ChakraUI.Center>
    );
}
