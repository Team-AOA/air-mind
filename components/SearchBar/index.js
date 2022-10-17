import React from "react";

import styled from "styled-components";

export default function SearchBar() {
  return (
    <SearchBarWrapper>
      <SearchInput></SearchInput>
      <SearchButton>돋보기</SearchButton>
    </SearchBarWrapper>
  );
}

const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  left: 1700px;
`;
const SearchInput = styled.input``;
const SearchButton = styled.button``;
