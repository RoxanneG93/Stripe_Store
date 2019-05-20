import React from 'react'
import { Box, Text } from 'gestalt';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="around"
            height={70}
            color="midnight"
            padding={1}
            shape="roundedBottom"
        >
            <NavLink to="/signin">
                <Text size="xl" color="white">SignIn</Text>
            </NavLink>
            <NavLink to="/">
                <Text size="xl" color="white">Home</Text>
            </NavLink>
            <NavLink to="/register">
                <Text size="xl" color="white">Register</Text>
            </NavLink>
        </Box>
    )
}
