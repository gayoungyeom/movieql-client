import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

const GET_MOVIE = gql`
    # apollo react를 위한 코드 -> id처럼 변수가 있는 경우 qeury name을 적어야 한다.
  query getMovie($id: Int!) {
    # server를 위한 코드/쿼리
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }

    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 70%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) }
  });

  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading ..." : data && data.movie ? `${data.movie.title} ${data.movie.isLiked ? "😄" : "😩"}` : ""}</Title>
        {!loading && data && data.movie && (
          <>
            <Subtitle>{data.movie.language} · {data.movie.rating}</Subtitle>
            <Description>{data.movie.description_intro}</Description>
          </>
        )}
      </Column>
      {/* <Poster bg={data && data.movie ? data.movie.medium_cover_image : ""}></Poster> */}
      {/* optional chaning! */}
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
    </Container>
  );
};