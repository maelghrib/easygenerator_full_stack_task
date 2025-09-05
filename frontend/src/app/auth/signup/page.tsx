'use client';

import * as ChakraUI from "@chakra-ui/react"
import {PasswordInput} from "@/components/ui/password-input"
import {useState} from "react";
import axios from '@/utils/axios';
import {AxiosResponse} from "axios";
import {useRouter} from 'next/navigation';
import {APIEndpoint, PageRoute, ResponseStatus} from "@/utils/constants";
import {Link as ChakraLink} from "@chakra-ui/react"
import NextLink from "next/link"
import {z} from "zod";
import {SignUpInputData, SignUpInputDataErrors, SignUpResponse} from "@/utils/types";

const signUpSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email format"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-zA-Z]/, "Password must contain at least one letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});


export default function SignUpPage() {

    const router = useRouter();

    const welcomeText = "Easygenerator SignUp"

    const initialSignUpInputData: SignUpInputData = {
        name: "",
        email: "",
        password: "",
    }

    const [signUpInputData, setSignUpInputData] = useState<SignUpInputData>(initialSignUpInputData)
    const [signUpInputDataErrors, setSignUpInputDataErrors] = useState<SignUpInputDataErrors>({})
    const [visible, setVisible] = useState(false)

    const validateSignUpInputData = () => {
        const result = signUpSchema.safeParse(signUpInputData);

        if (!result.success) {
            const newErrors: SignUpInputDataErrors = {};
            result.error.issues.forEach((issue) => {
                const field = issue.path[0] as string;
                if (!newErrors[field]) {
                    newErrors[field] = [];
                }
                newErrors[field].push(issue.message);
            });
            setSignUpInputDataErrors(newErrors);
            return false
        } else {
            setSignUpInputDataErrors({});
            return true
        }
    };

    const onSignUp = async () => {
        if (validateSignUpInputData()) {
            try {
                const response: AxiosResponse<SignUpResponse> = await axios.post(APIEndpoint.SIGNUP, signUpInputData)
                if (response.data.status === ResponseStatus.CREATED) {
                    router.push(PageRoute.LOGIN);
                } else {
                }

            } catch (error) {
                console.log(error)
            }
        } else {
            return;
        }
    }

    return (
        <ChakraUI.Center w={"100%"} h={"100vh"} flexDir={"column"} gap={"5"}>

            <ChakraUI.Text fontSize="30px" fontWeight={"bold"}>{welcomeText}</ChakraUI.Text>

            <ChakraUI.Flex w={"30%"} flexDir={"column"} gap={"5"}>

                <ChakraUI.Field.Root required invalid={signUpInputDataErrors.name?.length > 0}>
                    <ChakraUI.Field.Label>
                        Name <ChakraUI.Field.RequiredIndicator/>
                    </ChakraUI.Field.Label>
                    <ChakraUI.Input
                        placeholder="Enter Your Name"
                        onChange={event => {
                            const newSignUpInputData: SignUpInputData = {
                                ...signUpInputData,
                                name: event.target.value
                            }
                            setSignUpInputData(newSignUpInputData)
                        }}
                    />
                    {signUpInputDataErrors.name?.map((err, i) => (
                        <ChakraUI.Field.ErrorText key={i}>{err}</ChakraUI.Field.ErrorText>
                    ))}
                </ChakraUI.Field.Root>

                <ChakraUI.Field.Root required invalid={signUpInputDataErrors.email?.length > 0}>
                    <ChakraUI.Field.Label>
                        Email <ChakraUI.Field.RequiredIndicator/>
                    </ChakraUI.Field.Label>
                    <ChakraUI.Input
                        placeholder="Enter Your Email"
                        onChange={event => {
                            const newSignUpInputData: SignUpInputData = {
                                ...signUpInputData,
                                email: event.target.value
                            }
                            setSignUpInputData(newSignUpInputData)
                        }}
                    />
                    {signUpInputDataErrors.email?.map((err, i) => (
                        <ChakraUI.Field.ErrorText key={i}>{err}</ChakraUI.Field.ErrorText>
                    ))}
                </ChakraUI.Field.Root>

                <ChakraUI.Field.Root required invalid={signUpInputDataErrors.password?.length > 0}>
                    <ChakraUI.Field.Label>
                        Password <ChakraUI.Field.RequiredIndicator/>
                    </ChakraUI.Field.Label>
                    <PasswordInput
                        placeholder="Enter Your Password"
                        visible={visible}
                        onVisibleChange={setVisible}
                        onChange={event => {
                            const newSignUpInputData: SignUpInputData = {
                                ...signUpInputData,
                                password: event.target.value
                            }
                            setSignUpInputData(newSignUpInputData)
                        }}
                    />
                    {signUpInputDataErrors.password?.map((err, i) => (
                        <ChakraUI.Field.ErrorText key={i}>{err}</ChakraUI.Field.ErrorText>
                    ))}
                </ChakraUI.Field.Root>

                <ChakraUI.Button onClick={onSignUp}>Signup</ChakraUI.Button>

            </ChakraUI.Flex>

            <ChakraLink asChild>
                <NextLink href={PageRoute.LOGIN}>Already have an account? Login Here</NextLink>
            </ChakraLink>

        </ChakraUI.Center>
    );
}
