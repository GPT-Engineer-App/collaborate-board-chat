import { Box, Flex, Link } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isProjectSelected = location.pathname.startsWith("/projects/");

  return (
    <Box bg="brand.700" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link as={NavLink} to="/" px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "brand.900" }} _activeLink={{ bg: "brand.900" }}>
            Home
          </Link>
          <Link as={NavLink} to="/projects" px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "brand.900" }} _activeLink={{ bg: "brand.900" }}>
            Projects
          </Link>
          {isProjectSelected && (
            <>
              <Link as={NavLink} to={`${location.pathname}/kanban`} px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "brand.900" }} _activeLink={{ bg: "brand.900" }}>
                Kanban
              </Link>
              <Link as={NavLink} to={`${location.pathname}/chat`} px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "brand.900" }} _activeLink={{ bg: "brand.900" }}>
                Chat
              </Link>
              <Link as={NavLink} to={`${location.pathname}/notes`} px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "brand.900" }} _activeLink={{ bg: "brand.900" }}>
                Notes
              </Link>
              <Link as={NavLink} to={`${location.pathname}/users`} px={2} py={1} rounded="md" _hover={{ textDecoration: "none", bg: "brand.900" }} _activeLink={{ bg: "brand.900" }}>
                Invite Users
              </Link>
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;