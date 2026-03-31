import React, { Component } from "react";
import { ActivityIndicator, Text } from "react-native";
import api from "../services/api.js";
import { TMDB_API_KEY } from "../config.js";
import {
  Container,
  Header,
  AvatarPerfil,
  NamePerfil,
  BioPerfil,
  Stars,
  Starred,
  Info,
  Title,
  Author,
} from "../styles.js";

export default class Details extends Component {
  state = {
    movieDetails: null,
    loading: true,
  };

  async componentDidMount() {
    const { route } = this.props;
    const { movie } = route.params;

    try {
      const response = await api.get(
        `/movie/${movie.id}?api_key=${TMDB_API_KEY}&language=pt-BR`
      );
      this.setState({ movieDetails: response.data, loading: false });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { route } = this.props;
    const { movie } = route.params;
    const { movieDetails, loading } = this.state;

    if (loading) {
      return (
        <Container>
          <ActivityIndicator size="large" color="#7159c1" />
        </Container>
      );
    }

    if (!movieDetails) {
      return (
        <Container>
          <Text>Não foi possível carregar os detalhes do filme.</Text>
        </Container>
      );
    }

    return (
      <Container>
        <Header>
          <AvatarPerfil
            source={{
              uri: movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : movie.poster,
            }}
          />
          <NamePerfil>{movieDetails.title}</NamePerfil>
          <BioPerfil numberOfLines={5}>
            {movieDetails.overview || "Sem sinopse disponível."}
          </BioPerfil>
        </Header>

        <Stars
          showsVerticalScrollIndicator={false}
          data={[
            { id: "1", label: "Status", value: movieDetails.status || "N/A" },
            { id: "2", label: "Lançamento", value: movieDetails.release_date || "N/A" },
            { id: "3", label: "Nota", value: String(movieDetails.vote_average || "N/A") },
            { id: "4", label: "Votos", value: String(movieDetails.vote_count || "N/A") },
            {
              id: "5",
              label: "Gêneros",
              value: movieDetails.genres?.map((g) => g.name).join(", ") || "N/A",
            },
            {
              id: "6",
              label: "Duração",
              value: movieDetails.runtime ? `${movieDetails.runtime} min` : "N/A",
            },
            {
              id: "7",
              label: "Idioma original",
              value: movieDetails.original_language?.toUpperCase() || "N/A",
            },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Starred>
              <Info>
                <Title>{item.label}</Title>
                <Author>{item.value}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}