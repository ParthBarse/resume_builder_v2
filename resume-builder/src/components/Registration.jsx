// RegistrationPage.js
import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Checkbox,
  Stack,
  Select
} from '@chakra-ui/react';
import axios from "axios"

const RegistrationPage = (props) => {
  const { setResumeInfo, setPage } = props;
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    mobile: '',
    email: '',
    password: '',
    security : {
      securityQuestion : '',
      securityAnswer : '',
    },
    termsAccepted: false,
    // favoriteFood: '',
  });

  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
  };
  const handleRegistration = async (e) => {
    e.preventDefault();

    // Simulate registration process (send data to backend, receive confirmation, etc.)
    console.log('Simulating registration process:', formData);
    console.log(process.env.REACT_APP_HOST);
    const res = await axios({
      method : "post",
      url : `${process.env.REACT_APP_HOST}/register`,
      data : formData
    })
    console.log(res);
    if (res.data.success === true) {
      localStorage.setItem("token", res.data.authToken)
      setRegistrationComplete(true);
    }
    // Set registrationComplete to true for demo purposes
    else{
      alert(res.data.message || "Could not register")
    }
  };

  return (
    <Flex align="center" justify="center" h="100vh" marginBottom={4}>
<Box
  p={4}  // Decrease padding to make it smaller
  maxWidth="400px"  // Adjust the maximum width as needed
  borderWidth={3}
  borderRadius={14}
  borderColor="blue"
  boxShadow="80g"
  bg="white"
  position="absolute"
  marginBottom={4}
  left="50%"
  transform="translate(-50%, 20%)"
>
 

  
        <Heading mb={4} textAlign="center" color="black">
          Registration
        </Heading>
        {registrationComplete ? (
          <Box color="black" textAlign="center">
            Registration completed! Check your email for confirmation.
          </Box>
        ) : (
          <form onSubmit={handleRegistration}>
            <FormControl mb={4} isRequired>
              <FormLabel color="black">First name*</FormLabel>
              <Input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                color="black"
                bg="white"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel color="black">Last name*</FormLabel>
              <Input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                color="black"
                bg="white"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel color="black">Mobile Number*</FormLabel>
              <Input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                color="black"
                bg="white"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel color="black">Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                color="black"
                bg="white"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel color="black">Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                color="black"
                bg="white"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <Select color="black" bg="white" placeholder="Select an option"
              
              onChange={(e) => {
                const updateValue = {
                  ...formData.security,
                  securityQuestion:  e.target.value,
                };
                const updateFormdataInfo = { ...formData, security: updateValue };
                setFormData(updateFormdataInfo);
              }}
              >
                <option value="What is the name of your first school?">What is the name of your first school?</option>
                <option value="What is your favorite color?">What is your favorite color?</option>
                <option value="What is the name of your favorite book?">What is the name of your favorite book?</option>
              </Select>
              <br />
              <Input
                type="text"
                name="securityAnswer"
                placeholder="Answer"
                value={formData.security.securityAnswer}
                onChange={(e) => {
                  const updateValue = {
                    ...formData.security,
                    securityAnswer:  e.target.value,
                  };
                  const updateFormdataInfo = { ...formData, security: updateValue };
                  setFormData(updateFormdataInfo);
                }}
                color="black"
                bg="white"
              />
            </FormControl>
            <Stack spacing={4}>
              <Checkbox
               
                onChange={handleInputChange}
                name="termsAccepted"
              >
                I accept the terms and conditions
              </Checkbox>
              <Button type="submit" colorScheme="blackAlpha" width="100%" isDisabled={!formData.termsAccepted}>
                Register
              </Button>
            </Stack>
          </form>
        )}
      </Box>
    </Flex>
  );
};

export default RegistrationPage;
