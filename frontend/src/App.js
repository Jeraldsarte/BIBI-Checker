import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm.mjs";
import { Nav, Container } from "react-bootstrap";

const App = () => {
  const [key, setKey] = React.useState("signup");

  return (
    <Container className="pt-3">
      <Nav variant="tabs" activeKey={key} onSelect={setKey}>
        <Nav.Item>
          <Nav.Link eventKey="signup">Sign Up</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="login">Log In</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="mt-3">
        {key === "signup" && <SignupForm />}
        {key === "login" && <LoginForm />}
      </div>
    </Container>
  );
};

export default App;
