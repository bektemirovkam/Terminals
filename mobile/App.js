import React, { useEffect, useState } from "react";
import { Text, View, SectionList, Button } from "react-native";

import styled from "styled-components/native";
import Terminal from "./components/Terminal";
import axios from "./api/axios";
import AuthForm from "./components/AuthForm";

export default function App() {
  const [terminals, setTerminals] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const fetchTerminals = () => {
    setIsLoading(true);
    axios.get("/terminals").then(({ data }) => {
      setTerminals(data.data);
      setIsLoading(false);
    });
  };

  const fetchAuth = (formData, callback) => {
    setIsLoading(true);
    axios.post("/auth/login", formData).then(({data}) => {
      setIsAuth(true)
    }).catch((e) => {
      callback()
    })
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTerminals();
  }, []);

  if (!terminals) {
    return (
      <Container>
        <Text>Загрузка....</Text>
      </Container>
    );
  }

  return (
    <Container>
      {isAuth ? (
        <HomeScreen>
          <Header>
            <HeaderTitle>Список терминалов</HeaderTitle>
            <LogoutButton
              title={isLoading ? "Обновляется" : "Обновить"}
              onPress={() => {
                fetchTerminals();
              }}
              disabled={isLoading}
            />
          </Header>
          {terminals && (
            <SectionList
              sections={[{ data: terminals }]}
              keyExtractor={(item, index) => item.model + index}
              renderItem={({ item }) => <Terminal {...item} />}
            />
          )}
        </HomeScreen>
      ) : (
        <AuthForm fetchAuth={fetchAuth} isLoading={isLoading}/>
      )}
    </Container>
  );
}

const Container = styled.View`
`;

const HomeScreen = styled.View`
  padding-top: 70px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #f0ffff;
`;

const Header = styled.View`
  padding: 10px;
`;

const HeaderTitle = styled.Text`
  text-align: center;
  fontWeight: 800;
  fontSize: 30px;
`;

const LogoutButton = styled.Button``;
