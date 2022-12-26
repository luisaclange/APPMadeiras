import React, { useState } from 'react';
import { View } from 'react-native';
import {
  BorderBar,
  BorderItem,
  Container,
  Item,
  ItemsContainer,
  Progress,
  TextItem,
} from './styles';
import { ProgressNewCalc } from '../header';

interface IProps {
  stage: ProgressNewCalc;
}

export function ProgressBar({ stage }: IProps) {
  return (
    <Container>
      <BorderBar>
        <Progress status={stage} />
      </BorderBar>

      <ItemsContainer>
        <BorderItem>
          <Item>
            <TextItem>1</TextItem>
          </Item>
        </BorderItem>

        <BorderItem>
          <Item>
            <TextItem>2</TextItem>
          </Item>
        </BorderItem>

        <BorderItem>
          <Item>
            <TextItem>3</TextItem>
          </Item>
        </BorderItem>
      </ItemsContainer>
    </Container>
  );
}
