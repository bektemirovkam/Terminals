import React from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";

export default Terminal = ({
  model,
  city,
  organization,
  address,
  yearOfIssue,
  isOnline,
}) => {
  return (
    <TableItem>
      <TableTitle>{model}</TableTitle>
      <TableInfo>
        <TableInfoRow>
          <TableInfoTitle>
            <Text style={{ fontWeight: "bold" }}>Город:</Text>
          </TableInfoTitle>
          <TableInfoValue>
            <Text> {city}</Text>
          </TableInfoValue>
        </TableInfoRow>
        <TableInfoRow>
          <TableInfoTitle>
            <Text style={{ fontWeight: "bold" }}>Организация:</Text>
          </TableInfoTitle>
          <TableInfoValue>
            <Text> {organization}</Text>
          </TableInfoValue>
        </TableInfoRow>
        <TableInfoRow>
          <TableInfoTitle>
            <Text style={{ fontWeight: "bold" }}>Адрес:</Text>
          </TableInfoTitle>
          <TableInfoValue>
            <Text> {address}</Text>
          </TableInfoValue>
        </TableInfoRow>
        <TableInfoRow>
          <TableInfoTitle>
            <Text style={{ fontWeight: "bold" }}>Год выпуска:</Text>
          </TableInfoTitle>
          <TableInfoValue>
            <Text> {yearOfIssue}</Text>
          </TableInfoValue>
        </TableInfoRow>
        <TableInfoRow>
          <TableInfoStatus colorGreen={isOnline}>
            {isOnline ? "Online" : "Offline"}
          </TableInfoStatus>
        </TableInfoRow>
      </TableInfo>
    </TableItem>
  );
};

const TableItem = styled.View`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
`;

const TableTitle = styled.Text`
  fontSize: 24px;
  fontWeight: bold;
`;

const TableInfo = styled.View``;

const TableInfoRow = styled.View`
  flex-direction: row;
`;

const TableInfoTitle = styled.View`
  fontWeight: bold;
  fontSize: 17px;
`;

const TableInfoValue = styled.View``;

const TableInfoStatus = styled.Text`
  fontWeight: 900;
  fontSize: 17px;
  color: ${(props) => (props.colorGreen ? "green" : "red")};
`;
